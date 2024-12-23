import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PlansService } from './plans/services/plans.service';
import { MarketService } from './market/services/market.service';
import { Plan } from './plans/schema/plans.schema';
import { Market } from './market/schema/market.schema';

@Injectable()
export class ResetTotalsCronService {
  private readonly logger = new Logger(ResetTotalsCronService.name);

  constructor(
    private readonly plansService: PlansService,
    private readonly marketService: MarketService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    this.logger.debug('Running daily reset of totals');

    const plans: Plan[] = await this.plansService.findAll();
    for (const plan of plans) {
      await this.plansService.resetTotals(plan._id.toString());
    }

    // Reset totals for all markets
    const markets: Market[] = await this.marketService.getAllMarkets();
    for (const market of markets) {
      await this.marketService.resetTotals(market._id.toString());
    }

    this.logger.debug('Daily reset of totals completed');
  }
}
