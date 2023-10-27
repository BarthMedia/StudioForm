// Global d.ts

interface StudioFormElements {
  wrapper: HTMLElement;
  mask: HTMLElement;
}

interface StudioFormSlideLogic {
  any: any;
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
    get resetOnSubmit(): boolean;
  };
  fetch: {
    get any(): string;
  };
}

interface StudioFormInstance {
  name: string;
  // index: number; -- legacy
  elements: StudioFormElements;
  logic: StudioFormSlideLogic;
  record: number[];
  to: (slideId: number, options: StudioFormApiOptions) => void;
  next: (options: StudioFormApiOptions) => void;
  prev: (options: StudioFormApiOptions) => void;
  submit: (options: StudioFormApiOptions) => void;
  scrollTo: (options: StudioFormApiOptions) => void;
  reportValidity: () => void; // slideRequirements -- legacy
  reset: (options: StudioFormApiOptions) => void;
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
  api: StudioForm;
  proxy: StudioForm;
  get proxyWrite(): boolean;
  proxyWriteHandlers: ((event: ProxyWriteEvent) => true | void)[];
};

type ProxyWriteEvent = {
  mode: string;
  data: {
    target: object;
    property: string | symbol;
    value?: unknown;
  };
};

type StudioForm =
  | {
      [instanceName: string]:
        | StudioFormInstance
        | string
        | ((...args: unknown[]) => void);
    }
  | unknown[];
