import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private dataSource: DataSource) {}

  // Método para verificar o status da aplicação
  getStatus(): { status: string; database: string; timestamp: string } {
    this.logger.log('Chamado o método getStatus');
    const dbStatus = this.dataSource.isInitialized ? 'Conectado' : 'Desconectado';
    return {
      status: 'Aplicação rodando',
      database: dbStatus,
      timestamp: new Date().toISOString(),
    };
  }

  // Método para tratar erros
  handleError(error: any): string {
    this.logger.error('Ocorreu um erro', error.stack);
    return 'Erro no servidor. Por favor, tente novamente mais tarde.';
  }
}
