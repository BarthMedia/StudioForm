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
  get errors(): NodeListOf<HTMLElement>;

  // External buttons
  get prevs(): NodeListOf<HTMLElement>;
  get nexts(): HTMLElement[];
}

interface StudioFormButtonLogic {
  index: number;
  element: HTMLElement;
  get next(): 'done' | number;
  defaultText: string;
}
interface StudioFormSlideLogic {
  // Info
  get name(): string | null;
  index: number;
  element: HTMLElement;
  type: string;

  // Logic
  buttons: false | StudioFormButtonLogic[];
  get next(): 'done' | number;
}

interface SFAnimationConfig {
  // Current
  get currentMoveMultiplier(): number;
  get currentOpacity(): number;
  get currentTime(): number;

  // General
  get direction(): number | 'off';
  get directionAlignment(): string; // 'top' | 'center' | 'bottom';
  get ease(): string;
  get equalDimensionsMultiplier(): number;
  get zIndex(): number;

  // Scroll to
  get offset(): number | string;

  // Progress bar
  get progressBarAxis(): string;

  // Next
  get nextMoveMultiplier(): number;
  get nextOpacity(): number;
  get nextTime(): number;

  // Redirect
  get redirectDelay(): number;
}

interface SFFetchConfig {
  get action(): string;
  get method(): string;
  get accept(): string;
  get contentType(): string;
  get redirect(): string;
  get timeout(): number;
  get valueSeparator(): string;
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

interface SFFocus {
  clear: () => void;
  next: (triggerType?: 'enter') => void;
  prev: () => void;
}

type StudioFormSpreadElements = (
  | string
  | HTMLElement
  | HTMLElement[]
  | NodeListOf<HTMLElement>
)[];

// + Instance API +

interface StudioFormInstance {
  // Write API
  auth?: true;
  promise: (info: object) => Promise<boolean>; // For custom promises!
  resolve?: boolean; // sf-await get's removed // Allow for class prefix

  // Wized API
  fetch: (options?: SFOFetch) => Promise<boolean>;
  reportValidity: (
    ...elements: StudioFormSpreadElements
  ) => boolean | undefined; // slideRequirements -- legacy
  validate: (element?: HTMLInputElement) => boolean | undefined;
  recaptcha: () => Promise<string | undefined>;

  // Status
  isAwaiting: boolean;
  isTransitioning: boolean;
  isDone: boolean;

  // Navigation
  to: (slideId: number, options?: {}) => Promise<boolean>;
  next: (options?: {}) => Promise<boolean | string>;
  prev: (options?: {}) => Promise<boolean>;
  submit: (options?: { fake?: boolean }) => Promise<boolean>;
  scrollTo: (target: string | HTMLElement) => Promise<boolean>;
  focus: SFFocus;

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
  // Elements
  currentElement: HTMLElement;
  nextElement: HTMLElement;
  parentElement: HTMLElement;
  overflowElement: HTMLElement;

  // General
  direction: number | string;
  angle: number;
  zIndex: number;
  equalDimensions: number;
  equalDimensionsMulitplier: number;
  totalTime: number;

  // Current
  currentX: number;
  currentY: number;
  currentOpacity: number;
  currentWidth: number;
  currentHeight: number;
  currentMoveMultiplier: number;
  currentTime: number;
  currentDisplayStart: string;
  currentDisplayEnd: string;

  // Next
  nextX: number;
  nextY: number;
  nextOpacity: number;
  nextWidth: number;
  nextHeight: number;
  nextMoveMultiplier: number;
  nextTime: number;
  nextDisplayStart: string;

  // Scroll to
  scrollToY: number;
  scrollToTarget: HTMLElement;
  scrollToOffset: number;
  scrollToContainer: HTMLElement | Window;
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
      message: string;
      code?: string | unknown;
      details?: null | unknown;
    };
  };
}

interface SFValidityData {
  input: HTMLElement;
  message: string;
  regex?: RegExp;
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
  validity: SFValidityData[];

  // Animations
  slideCurrent: number | string;
  slideNext: number | string;
  gsapTl: {
    progress: (gsap.core.Timeline | undefined)[];
    transition?: gsap.core.Timeline;
    current?: gsap.core.Timeline;
  };

  // Proxy
  proxyCallbacks: SFProxyCallbacks;

  // Focus
  focus: SFGhostFocus;

  // Events
  observer: MutationObserver | null;
  events: StudioFormGhostInstanceEvents[];
}

type StudioFormGhostInstanceEvents = [
  HTMLElement | Document | (Window & typeof globalThis),
  string,
  (event?: Event) => void
];

interface SFGhostFocus {
  doubleClick?: true;
  button?: HTMLElement;
}

interface StudioFormEvents {
  [instanceName: string]: StudioFormEvent[];
}

interface StudioFormEvent {
  name: string;
  function: (e: unknown) => void;
}

type StudioFormState = {
  // Active instance:
  activeKeyBoardInstance: string;

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
  proxyCallbacks: SFProxyCallbacks;
};

interface SFProxyCallbacks {
  [eventName: string]: (data: ProxyWriteEventData) => boolean;
}

interface ProxyWriteEventData {
  target: object;
  property: string | symbol;
  value?: unknown;
}

interface ProxyWriteEvent {
  mode: string;
  identifier?: string;
  instanceName?: string;
  data: ProxyWriteEventData;
}

type StudioFormGlobalConfig = {
  // Strings
  comboClassPrefix: string;
  eventPrefix: string;
  externalEventSuffix: string;
  recaptchaKey: string;

  // Boolean
  classCascading: boolean;
  eventBubbles: boolean;
  warn: boolean;
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
