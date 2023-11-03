// Global d.ts

interface StudioFormElements {
  // Standard
  wrapper: HTMLElement;
  mask: HTMLElement;
  get slides(): NodeListOf<HTMLElement>;
  successMsg: HTMLElement | null;
  errorMsg: HTMLElement | null;

  // Progress
  get progressBars(): NodeListOf<HTMLElement>;
  get currentSlides(): NodeListOf<HTMLElement>;
  get minMaxSlides(): NodeListOf<HTMLElement>;
  get minSlides(): NodeListOf<HTMLElement>;
  get maxSlides(): NodeListOf<HTMLElement>;

  // Fetch response
  get responses(): NodeListOf<HTMLElement>;

  // External buttons
  get prevs(): NodeListOf<HTMLElement>;
  get nexts(): HTMLElement[];
  get tos(): NodeListOf<HTMLElement>[];
}

interface StudioFormButtonLogic {
  index: number;
  element: HTMLElement;
  conditional: string;
  next: boolean | number;
  conditionalPrev?: true;
}
interface StudioFormSlideLogic {
  type: string;
  index: number;
  element: HTMLElement;
  buttons: false | StudioFormButtonLogic[];
  conditional: string;
  conditionalNext: boolean | string | undefined;
  next?: false | number;
}

interface StudioFormButtonObject {
  any: any;
}

interface StudioFormApiOptions {
  passSlideRequirements?: boolean;
  buttonObject?: StudioFormButtonObject;
  currentSlideId?: number;
  nextSlideId?: number;
  isSubmit?: boolean;
  scrollToTarget?: boolean;
  target?: HTMLElement | string;
  offset?: HTMLElement | string | number;
  attributeReferenceElement?: HTMLElement;
  awaitAnimation?: boolean;
  skipAnimations?: boolean;
  forceSubmissionSuccess?: boolean;
  callback?: (success: boolean) => void;
}

interface StudioFormConfig {
  animations: {
    get any(): string;
  };
  modes: {
    [name: string]: boolean;
  };
  fetch: {
    get any(): string;
  };
}

interface StudioFormInstance {
  // Write API
  auth?: true;
  promise?: boolean; // For custom promises!
  resolve?: boolean; // sf-await get's removed // Allow for class prefix
  submitted?: boolean;

  // Wized API
  reset: (options?: {}) => void;
  fetch: (options?: {
    url?: string;
    method?: string;
    authorization?: string;
    accept?: string;
    contentType?: string;
    formData?: FormData;
    headers?: Headers;
  }) => unknown;
  get formData(): FormData;
  progress: (options?: { animate: boolean }) => unknown;
  to: (slideId: number, options?: {}) => boolean;

  // Standard
  name: string;
  // index: number; -- legacy
  elements: StudioFormElements;
  logic: StudioFormSlideLogic[];
  record: number[];
  next: (options?: {}) => void;
  prev: (options?: {}) => void;
  submit: (options?: {}) => void;
  scrollTo: (options?: {}) => void;
  reportValidity: () => void; // slideRequirements -- legacy
  suggest: {
    clear: (slideId: number) => {};
    next: (slideId: number) => {};
    prev: (slideId: number) => {};
  };
  data: StudioFormData;
  config: StudioFormConfig;
}

interface StudioFormData {
  animation: SFAnimationData;
  fetch: SFFetchData;
  progress: SFProgressData;
}

interface SFAnimationData {
  any?: any;
}

interface SFFetchData {
  any?: any;
}

interface SFProgressData {
  any?: any;
}

interface StudioFormGhostInstance {
  auth: { token: string | undefined };
  record: number[];
  animationData: SFAnimationData;
  progressData: SFProgressData;
}

interface StudioFormEvents {
  [instanceName: string]: StudioFormEvent[];
}

interface StudioFormEvent {
  name: string;
  function: (e: unknown) => void;
}

type StudioFormState = {
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
  createReadMostlyProxy: (object: object, description?: string) => object;
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
