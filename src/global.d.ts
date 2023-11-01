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
  get res(): NodeListOf<HTMLElement>;

  // External buttons
  get prevs(): NodeListOf<HTMLElement>;
  get nexts(): HTMLElement[];
}

interface StudioFormSlideLogic {
  type: string;
  index: number;
  element: HTMLElement;
  buttons:
    | false
    | {
        index: number;
        element: HTMLElement;
        conditional: string;
        next: boolean | number;
      }[];
  conditional: string;
  conditionalNext: boolean | string | undefined;
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
  auth?: string;
  promise?: boolean; // For custom promises!
  resolve?: boolean; // sf-await get's removed // Allow for class prefix

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
  data: {
    animation: {
      any: any;
    };
    submission: {
      any: any;
    };
  };
  config: StudioFormConfig;
}

type StudioFormState = {
  instances: { [instanceName: string]: StudioFormInstance };
  initInstance: (
    instanceName: string,
    wrapper: HTMLElement,
    mask: HTMLElement
  ) => void;
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
