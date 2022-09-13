import { ControllerProperty } from 'src/core/decorators/controller-decorators/class-decorators/controller-property.decorator';

@ControllerProperty('v1/ledgers', 'Ledgers')
export class LedgerController {
  constructor() {
    // fill above parentheses with use case / repository dependencies
  }
}
