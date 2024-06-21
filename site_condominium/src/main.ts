import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { appConfig } from './app/app.config';  // Certifique-se de que o appConfig está importado corretamente

bootstrapApplication(AppComponent, {
  ...appConfig,  // Espalha a configuração existente
  providers: [...(appConfig.providers || []), provideHttpClient()]  // Adiciona o HttpClient aos provedores existentes
})
  .catch((err) => console.error(err));

