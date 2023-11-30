// Global d.ts

interface StudioFormElements {
  // Standard
  wrapper: HTMLElement;
  mask: HTMLElement;
  get slides(): NodeListOf<HTMLElement>;
  done: HTMLElement | null;
  fail: HTMLElement | null;

  // Progress
  get progressBars(): NodeListOf<HTMLElement>;
  get currentSlides(): NodeListOf<HTMLElement>;
  get minMaxSlides(): NodeListOf<HTMLElement>;
  get minSlides(): NodeListOf<HTMLElement>;
  get maxSlides(): NodeListOf<HTMLElement>;

  // Fetch response
  get error(): NodeListOf<HTMLElement>;

  // Anchor
  anchor: HTMLElement | null;

  // External buttons
  get prevs(): NodeListOf<HTMLElement>;
  get nexts(): HTMLElement[];
  get tos(): {
    nodeList: NodeListOf<HTMLElement>;
    values: string[];
  }[];
}

interface StudioFormButtonLogic {
  index: number;
  element: HTMLElement;
  conditional: string;
  next: boolean | number;
  conditionalPrev?: true;
}
interface StudioFormSlideLogic {
  // Info
  get name(): string | null;
  index: number;
  element: HTMLElement;
  type: string;

  // Logic
  buttons: false | StudioFormButtonLogic[];
  conditional: string;
  conditionalNext: boolean | string | undefined;
  next?: false | number;
}

// interface StudioFormApiOptions {
//   passSlideRequirements?: boolean;
//   buttonObject?: StudioFormButtonObject;
//   currentSlideId?: number;
//   nextSlideId?: number;
//   isSubmit?: boolean;
//   scrollToTarget?: boolean;
//   target?: HTMLElement | string;
//   offset?: HTMLElement | string | number;
//   attributeReferenceElement?: HTMLElement;
//   awaitAnimations?: boolean;
//   skipAnimations?: boolean;
//   forceSubmissionSuccess?: boolean;
//   callback?: (success: boolean) => void;
// }

interface SFAnimationConfig {
  // Current
  get currentMoveMultiplier(): number;
  get currentOpacity(): number;
  get currentTime(): number;

  // General
  get direction(): number | string;
  get ease(): string;
  get equalDimensionsMultiplier(): number;

  // Progress bar
  get progressBarAxis(): string;

  // Next
  get nextMoveMultiplier(): number;
  get nextOpacity(): number;
  get nextTime(): number;
  get nextZIndex(): number;
}

interface SFFetchConfig {
  get action(): string;
  get method(): string;
  get accept(): string;
  get contentType(): string;
  get redirect(): string;
  get timeout(): number;
}

interface SFModesConfig {
  [name: string]: boolean;
}

interface StudioFormConfig {
  animations: SFAnimationConfig;
  fetch: SFFetchConfig;
  modes: SFModesConfig;
}

// + Instance API options +

interface SFOScrollTo {
  target: string | HTMLElement;
  offset?: string | HTMLElement;
}

interface SFOFetch {
  url?: string;
  method?: string;
  authorization?: string;
  accept?: string;
  contentType?: string;
  formData?: FormData;
  headers?: Headers;
}

// + Instance navigation API options +
interface SFONav {
  // Submit
  fake?: boolean;

  // General
  button?: StudioFormButtonLogic;
  awaitAnimations?: boolean;
  skipAnimations?: boolean;
  skipRequirements?: boolean;
}

// + Instance API other +

interface SFHidden {
  [name: string]: string | File;
}

interface SFSuggest {
  clear: () => void;
  next: () => void;
  prev: () => void;
}

// + Instance API +

interface StudioFormInstance {
  // Write API
  auth?: true;
  promise: () => Promise<boolean>; // For custom promises!
  resolve?: boolean; // sf-await get's removed // Allow for class prefix

  // Wized API
  reset: (options?: {}) => void;
  fetch: (options?: SFOFetch) => Promise<boolean>;
  reportValidity: (...elements: HTMLElement[]) => void; // slideRequirements -- legacy

  // Status
  isAwaiting: boolean;
  isTransitioning: boolean;
  isDone: boolean;

  // Navigation
  to: (slideId: number, options?: {}) => Promise<boolean>;
  next: (options?: {}) => Promise<boolean | string>;
  prev: (options?: {}) => Promise<boolean>;
  submit: (options?: { fake?: boolean }) => Promise<boolean>;
  scrollTo: (options: SFOScrollTo) => void;
  suggest: SFSuggest;

  // External data
  hidden: SFHidden;

  // Internal data
  name: string;
  elements: StudioFormElements;
  logic: StudioFormSlideLogic[];
  record: number[];
  data: StudioFormData;
  config: StudioFormConfig;
}

interface StudioFormData {
  animation: SFAnimationData;
  fetch: SFFetchData;
  files: SFFilesData;
  get form(): SFFormData;
  get params(): false | URLSearchParams;
  get progress(): SFProgressData;
  validity: SFValidityData[];
}

interface SFFilesData {
  [name: string]: File | File[];
}

type SFFormData = false | FormData | URLSearchParams;

interface SFProgressData {
  fast: {
    percentage: number;
    path: number;
  };
  slow: {
    percentage: number;
    path: number;
  };
  traversed: number;
}

interface SFAnimationData {
  any: any;
}

interface SFFetchData {
  redirect?: string;
  request?: {
    url: string;
    method: string;
    headers?: Headers;
    body?: String | FormData;
    params?: URLSearchParams;
  };
  response?: {
    ok: boolean;
    contentType?: string;
    headers: Headers;
    result?: false | unknown;
    status: number;
    error?: {
      message: string | unknown;
      code?: string | unknown;
      details?: null | unknown;
    };
  };
}

interface SFValidityData {
  any: any;
}

interface SFHiddenData {
  any?: any;
}

interface StudioFormGhostInstance {
  // Other
  root: StudioFormInstance;
  auth: { token: string | undefined };
  animationData: SFAnimationData;
  fetchData: SFFetchData;
  hiddenData: SFHiddenData;
  record: number[];
  asyncRecord: number[];
  files: SFFilesData;

  // Animations
  slideCurrent: number | string;
  slideNext: number | string;
  gsapTl: {
    progress?: gsap.core.Timeline;
    transition?: gsap.core.Timeline;
  };

  // Suggest
  suggest: {
    doubleClick?: true;
    button: HTMLElement;
  };

  // Events
  observer: MutationObserver | null;
}

interface StudioFormEvents {
  [instanceName: string]: StudioFormEvent[];
}

interface StudioFormEvent {
  name: string;
  function: (e: unknown) => void;
}

type StudioFormState = {
  // Keyboard activity
  activeKeyBoardInstance: string;

  // Storage / "garbage collection"
  events: StudioFormEvents;

  // Backbone
  ghostInstances: { [instanceName: string]: StudioFormGhostInstance };
  instances: { [instanceName: string]: StudioFormInstance };
  initInstance: (
    instanceName: string,
    wrapper: HTMLElement,
    mask: HTMLElement
  ) => void;

  // Proxy & API
  api: StudioForm;
  proxy: StudioForm;
  get proxyWrite(): boolean;
};

interface ProxyWriteEvent {
  mode: string;
  description: string;
  data: {
    target: object;
    property: string | symbol;
    value?: unknown;
  };
}

type StudioFormGlobalConfig = {
  comboClassPrefix: string;
  eventPrefix: string;
  classCascading: boolean;
};

type StudioForm =
  | {
      [instanceName: string]:
        | StudioFormInstance
        | StudioFormGlobalConfig
        | string
        | number
        | unknown[]
        | ((
            callback: (
              instance: unknown,
              index: number,
              instances: unknown[]
            ) => unknown
          ) => void)
        | ((...args: unknown[]) => void);
    }
  | unknown[];
