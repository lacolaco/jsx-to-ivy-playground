import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  Type,
  ɵdefineComponent as defineComponent,
  ɵRenderFlags as RenderFlags,
  ɵE as elementStart,
  ɵL as listener,
  ɵT as text,
  ɵt as textBinding,
  ɵb as bind,
  ɵp as elementProperty,
  ɵe as elementEnd
} from '@angular/core';

const log = (...args: any[]) => console.debug(...args);

// Ivy API
export type ComponentTemplate<T> = (rf: RenderFlags, ctx: T) => void;

// ngJSX
export type JSXInstruction = (
  renderFlags: RenderFlags,
  index: number
) => number;

export interface NgJSXRender {
  render(): JSXInstruction;
}

export function jsxToIvy<T>(rf: RenderFlags, jsx: JSXInstruction): void {
  // jsx AST to Ivy instruction
  jsx(rf, 0);
}

export type Node = any;

export function createElement(
  tagNameOrComponent: string,
  props: Record<string, any>,
  ...children: Node[]
): JSXInstruction {
  return (rf: RenderFlags, currentIndex = 0) => {
    log(currentIndex, tagNameOrComponent, props);

    const hostIndex = currentIndex++;
    if (rf & RenderFlags.Create) {
      elementStart(hostIndex, tagNameOrComponent as string, null);
    }

    for (const key of Object.keys(props || {})) {
      const value = props[key];
      if (key.startsWith('on-')) {
        if (rf & RenderFlags.Create) {
          const eventName = key.replace(/^on-/, '');
          listener(eventName, value);
        }
      } else {
        elementProperty(hostIndex, key, value);
      }
    }

    for (const child of children) {
      log(currentIndex, child);
      if (typeof child !== 'function') {
        const index = currentIndex++;
        if (rf & RenderFlags.Create) {
          text(index, child);
        }
        if (rf & RenderFlags.Update) {
          textBinding(index, child);
        }
      } else if (typeof child === 'function') {
        // child instruction
        currentIndex = child(rf, currentIndex);
      }
    }
    if (rf & RenderFlags.Create) {
      elementEnd();
    }
    return currentIndex;
  };
}
