import { ControllerProperty } from 'src/core/decorators/controller-decorators/class-decorators/controller-property.decorator';

@ControllerProperty('v1/currencies', 'Currencies')
export class CurrencyController {
  constructor() {
    // fill above parentheses with use case / repository dependencies
  }
}
