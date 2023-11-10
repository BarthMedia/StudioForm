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
//   awaitAnimation?: boolean;
//   skipAnimations?: boolean;
//   forceSubmissionSuccess?: boolean;
//   callback?: (success: boolean) => void;
// }

interface SFAnimationConfig {
  get any(): string;
}

interface SFFetchConfig {
  get any(): string;
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
  reportValidity: () => void; // slideRequirements -- legacy

  // Navigation
  to: (slideId: number, options?: {}) => Promise<boolean>;
  next: (options?: {}) => Promise<boolean>;
  prev: (options?: {}) => Promise<boolean>;
  submit: (options?: {}) => Promise<boolean>;
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
  get form(): SFFormData;
  get progress(): SFProgressData;
}

interface SFFormData {
  any?: any;
}

interface SFProgressData {
  any?: any;
}

interface SFAnimationData {
  any?: any;
}

interface SFFetchData {
  any?: any;
}

interface SFHiddenData {
  any?: any;
}

interface StudioFormGhostInstance {
  auth: { token: string | undefined };
  animationData: SFAnimationData;
  fetchData: SFFetchData;
  hiddenData: SFHiddenData;
  record: number[];
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
