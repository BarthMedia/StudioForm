// + Imports +
import * as model from '../../model';
import * as config from '../../config';
import * as utils from './utils';
import * as controllerUtils from '../controller/utils';

// Error
// const errPath = (n: string) =>
//   `${controllerUtils.errorName(n)} calculateProgress.ts:`;

// + Exports +
export default function (instance: StudioFormInstance) {
  // Values
  const slideLogic = instance.logic;
  const slideRecord = instance.record;

  // - Return longest or shortest path to the first possible submit -

  // Values
  const currentRecordId = utils.currentSlideId(instance);

  // Define interfaces for the graph and its components
  interface Graph {
    [key: string]: (string | number)[];
  }

  interface QueueNode {
    node: string;
    path: string[];
  }

  // Define a graph representation, usually an adjacency list
  const graph: Graph = {};
  function createGraph(slideId: number) {
    // Values
    const slide: StudioFormSlideLogic | undefined = slideLogic[slideId];

    // Guard
    if (!slide) return;

    // Values
    const arr: Set<number | 'done'> = new Set();
    slide.buttons
      ? slide.buttons.map(button => arr.add(button.next))
      : arr.add(slide.next);
    arr.forEach(item => {
      if (item != 'done' && item <= slideId) {
        arr.delete(item);
      }
    });

    // "Push" unique values
    graph[slideId] = Array.from(arr);

    // Loop
    createGraph(slideId + 1);
  }
  createGraph(currentRecordId);

  function shortestPath(
    graph: Graph,
    startNode: string,
    endNode: string
  ): string[] | null {
    // Initialize a queue for BFS and a set to keep track of visited nodes
    const queue: QueueNode[] = [{ node: startNode, path: [startNode] }];
    const visited: Set<string> = new Set();

    // Loop until the queue is empty
    while (queue.length > 0) {
      // Dequeue a node from the queue
      const { node, path } = queue.shift()!;

      // Mark the node as visited
      visited.add(node);

      // Check if the current node is the target node
      if (node === endNode) {
        return path; // Return the path to the target node
      }

      // Enqueue adjacent nodes that haven't been visited yet
      for (const neighbor of graph[node]) {
        if (!visited.has(String(neighbor))) {
          // Add the neighbor node to the queue along with the path taken to reach it
          queue.push({
            node: String(neighbor),
            path: [...path, String(neighbor)],
          });
        }
      }
    }

    // If no path is found, return null
    return null;
  }

  function longestPath(
    graph: Graph,
    startNode: string,
    endNode: string
  ): string[] | null {
    // Initialize a queue for BFS
    const queue: QueueNode[] = [{ node: startNode, path: [startNode] }];
    let longestPath: string[] | null = null;

    // Loop until the queue is empty
    while (queue.length > 0) {
      // Dequeue a node from the queue
      const { node, path } = queue.shift()!;

      // Check if the current node is the target node
      if (node === endNode) {
        longestPath = path; // Update the longest path
      }

      // Skip
      if (node == 'done') continue;

      // Enqueue adjacent nodes
      for (const neighbor of graph[node]) {
        // Add the neighbor node to the queue along with the path taken to reach it
        queue.push({
          node: String(neighbor),
          path: [...path, String(neighbor)],
        });
      }
    }

    // Return the longest path found
    return longestPath;
  }

  // Values
  const graphStartKey = currentRecordId.toString();
  const slideRecordLength = slideRecord.length;
  const pathToDoneS = shortestPath(graph, graphStartKey, 'done');
  const pathToDoneL = longestPath(graph, graphStartKey, 'done');

  // Math
  const min = slideRecordLength - 1 + pathToDoneS?.length!;
  const max = slideRecordLength - 1 + pathToDoneL?.length!;

  // Logic
  const returnVal: SFProgressData = {
    fast: {
      percentage: (slideRecordLength / min) * 100,
      path: min - 1,
    },
    slow: {
      percentage: (slideRecordLength / max) * 100,
      path: max - 1,
    },
    traversed: slideRecordLength,
  };

  // Return
  return returnVal;
}
