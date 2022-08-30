import { ControllerProperty } from 'src/core/decorators/controller-decorators/class-decorators/controller-property.decorator';

@ControllerProperty('v1/balances', 'Balances')
export class BalanceController {
  constructor() {
    // fill above parentheses with use case / repository dependencies
  }
}
