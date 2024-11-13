import { Controller, Get, InternalServerErrorException, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  // Rota GET para verificar o status da aplicação
  @Get('status')
  getStatus() {
    try {
      this.logger.log('Requisição para a rota de status');
      return this.appService.getStatus();
    } catch (error) {
      this.logger.error('Erro na rota de status', error.stack);
      throw new InternalServerErrorException(this.appService.handleError(error));
    }
  }
}
