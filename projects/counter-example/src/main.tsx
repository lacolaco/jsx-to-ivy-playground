import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  Type,
  ɵi1 as i1,
  ɵrenderComponent as renderComponent,
  ɵdefineComponent as defineComponent,
  ɵRenderFlags as RenderFlags,
  ɵNgOnChangesFeature as NgOnChangesFeature,
  OnInit
} from '@angular/core';

import { jsxToIvy, NgJSXRender, createElement } from 'ng-jsx';

export class CounterComponent implements OnInit, NgJSXRender {
  readonly initialCount = 0;
  count = 0;
  ngOnInit() {
    this.count = this.initialCount;
  }
  countUp() {
    this.count = this.count + 1;
  }
  render() {
    return (
      <div>
        <div>Count: {this.count}</div>
        <button on-click={() => this.countUp()}>CountUp</button>
      </div>
    );
  }
  static ngTemplate(rf: any, ctx: CounterComponent) {
    jsxToIvy(rf, ctx.render());
  }
  static ngComponentDef = defineComponent<CounterComponent>({
    type: CounterComponent,
    factory: () => new CounterComponent(),
    selectors: [['app-counter-jsx']],
    inputs: { initialCount: 'initialCount' },
    template: CounterComponent.ngTemplate
  });
}

export class ParentComponent implements NgJSXRender {
  render() {
    return (
      <div>
        <app-counter-jsx initialCount={100} />
      </div>
    );
  }
  static ngTemplate(rf: any, ctx: ParentComponent) {
    jsxToIvy(rf, ctx.render());
  }
  static ngComponentDef = defineComponent<ParentComponent>({
    type: ParentComponent,
    factory: () => new ParentComponent(),
    selectors: [['app-root']],
    template: ParentComponent.ngTemplate,
    directives: [CounterComponent]
  });
}

renderComponent(ParentComponent);
