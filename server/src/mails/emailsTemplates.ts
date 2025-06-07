// Plantilla: Bienvenida a WeatherWise - Responsive & Enhanced
export const WELCOME_TEMPLATE = (userName: string = "Usuario") => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Bienvenido a WeatherWise</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; max-width: 100% !important; }
      .content { padding: 30px 20px !important; }
      .header { padding: 40px 20px !important; }
      .features-row { display: block !important; }
      .feature-col { width: 100% !important; padding: 0 0 20px 0 !important; }
      .button { padding: 16px 24px !important; font-size: 15px !important; }
      h1 { font-size: 28px !important; }
      h2 { font-size: 24px !important; }
      .footer-content { padding: 30px 20px !important; }
    }
    .button:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 15px 35px rgba(59, 130, 246, 0.4) !important;
    }
    .feature-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh;">
    <tr>
      <td align="center" style="padding: 20px;">
        
        <!-- Container Principal -->
        <table class="container" width="600" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px rgba(0,0,0,0.15); max-width: 600px;">
          
          <!-- Header con gradiente -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); padding: 0; position: relative;">
              <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1" fill="white" opacity="0.1"/><circle cx="80" cy="80" r="1" fill="white" opacity="0.05"/><circle cx="40" cy="60" r="0.5" fill="white" opacity="0.08"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>'); opacity: 0.3;"></div>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td class="header" style="padding: 50px 40px; text-align: center; position: relative; z-index: 1;">
                    <!-- Logo Weather -->
                    <div style="width: 80px; height: 80px; margin: 0 auto 24px; background: rgba(255,255,255,0.15); border-radius: 50%; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2); transition: all 0.3s ease;">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="white" opacity="0.9"/>
                        <circle cx="6" cy="18" r="2" fill="white" opacity="0.7"/>
                        <circle cx="18" cy="18" r="2" fill="white" opacity="0.7"/>
                        <circle cx="12" cy="22" r="1" fill="white" opacity="0.5"/>
                      </svg>
                    </div>
                    <h1 style="margin: 0; color: white; font-size: 32px; font-weight: 700; letter-spacing: -0.5px; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">WeatherWise</h1>
                    <p style="margin: 12px 0 0; color: rgba(255,255,255,0.9); font-size: 16px; font-weight: 400;">Tu nuevo asistente meteorológico</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Contenido Principal -->
          <tr>
            <td style="padding: 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td class="content" style="padding: 50px 40px;">
                    <h2 style="margin: 0 0 24px; color: #1a1a1a; font-size: 28px; font-weight: 600; letter-spacing: -0.3px;">¡Hola ${userName}! 👋</h2>
                    
                    <p style="margin: 0 0 32px; color: #4a4a4a; font-size: 18px; line-height: 1.6; font-weight: 400;">Bienvenido a <strong style="color: #2a5298;">WeatherWise</strong>, donde la precisión meteorológica se encuentra con el diseño elegante.</p>
                    
                    <!-- Features Grid -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin: 40px 0;">
                      <tr class="features-row">
                        <td class="feature-col" width="50%" style="padding-right: 16px; vertical-align: top;">
                          <div class="feature-card" style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0; transition: all 0.3s ease;">
                            <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); border-radius: 12px; margin-bottom: 16px; display: flex; align-items: center; justify-content: center;">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                              </svg>
                            </div>
                            <h3 style="margin: 0 0 8px; color: #1e293b; font-size: 16px; font-weight: 600;">Pronósticos Precisos</h3>
                            <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.5;">Datos meteorológicos en tiempo real con precisión profesional.</p>
                          </div>
                        </td>
                        <td class="feature-col" width="50%" style="padding-left: 16px; vertical-align: top;">
                          <div class="feature-card" style="background: linear-gradient(135deg, #fefce8 0%, #fef3c7 100%); padding: 24px; border-radius: 12px; border: 1px solid #fde68a; transition: all 0.3s ease;">
                            <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); border-radius: 12px; margin-bottom: 16px; display: flex; align-items: center; justify-content: center;">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                              </svg>
                            </div>
                            <h3 style="margin: 0 0 8px; color: #92400e; font-size: 16px; font-weight: 600;">Alertas Inteligentes</h3>
                            <p style="margin: 0; color: #a16207; font-size: 14px; line-height: 1.5;">Notificaciones personalizadas para mantenerte siempre preparado.</p>
                          </div>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- CTA Button Enhanced -->
                    <div style="text-align: center; margin: 50px 0 40px;">
                      <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                        <tr>
                          <td style="border-radius: 50px; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);">
                            <a href="https://weatherwise.app" class="button" style="display: inline-block; color: white; padding: 18px 36px; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 16px; letter-spacing: 0.5px; transition: all 0.3s ease; border: none;">
                              ✨ Comenzar mi experiencia
                            </a>
                          </td>
                        </tr>
                      </table>
                    </div>
                    
                    <!-- Stats Section -->
                    <div style="text-align: center; padding: 32px 0; border-top: 1px solid #f1f5f9;">
                      <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">
                        <p style="margin: 0; color: #0369a1; font-size: 15px; line-height: 1.6; font-weight: 500;">
                          🎉 Únete a más de <strong style="color: #1e40af; font-size: 18px;">50,000 usuarios</strong> que ya confían en WeatherWise<br>
                          para sus decisiones diarias.
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer elegante -->
          <tr>
            <td class="footer-content" style="background: #f8fafc; padding: 40px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 16px; color: #1e293b; font-size: 18px; font-weight: 600;">💙 El equipo de WeatherWise</p>
              <p style="margin: 0 0 24px; color: #64748b; font-size: 14px; line-height: 1.6;">
                Este mensaje fue enviado con cariño desde nuestros servidores.<br>
                Si tienes preguntas, estamos aquí para ayudarte.
              </p>
              
              <!-- Social Links Enhanced -->
              <div style="margin: 24px 0;">
                <a href="#" style="display: inline-block; margin: 0 8px; width: 40px; height: 40px; background: #e2e8f0; border-radius: 50%; text-decoration: none; transition: all 0.3s ease;">
                  <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#64748b">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </div>
                </a>
                <a href="#" style="display: inline-block; margin: 0 8px; width: 40px; height: 40px; background: #e2e8f0; border-radius: 50%; text-decoration: none; transition: all 0.3s ease;">
                  <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#64748b">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                    </svg>
                  </div>
                </a>
              </div>
              
              <p style="margin: 24px 0 0; color: #94a3b8; font-size: 12px;">
                © 2025 WeatherWise. Todos los derechos reservados.<br>
                <a href="#" style="color: #64748b; text-decoration: none;">Política de Privacidad</a> • 
                <a href="#" style="color: #64748b; text-decoration: none;">Términos de Servicio</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// Plantilla: Reset Password Request - Solo userName y código
export const PASSWORD_RESET_REQUEST_TEMPLATE = (
  userName: string,
  verificationCode: string
) => `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Restablece tu Contraseña - WeatherWise</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
      @media only screen and (max-width: 600px) {
        .container { width: 100% !important; max-width: 100% !important; }
        .content { padding: 30px 20px !important; }
        .header { padding: 30px 20px !important; }
        .code-container { padding: 30px 20px !important; }
        .verification-code { font-size: 28px !important; letter-spacing: 4px !important; }
        .button { padding: 14px 24px !important; font-size: 15px !important; }
        h1 { font-size: 24px !important; }
        h2 { font-size: 20px !important; }
      }
      .code-box:hover {
        transform: scale(1.02);
        box-shadow: 0 8px 25px rgba(220, 38, 38, 0.2);
      }
    </style>
</head>
<body style="margin: 0; padding: 0; background: linear-gradient(135deg, #1e1e2e 0%, #2d1b69 100%); font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #1e1e2e 0%, #2d1b69 100%); min-height: 100vh;">
    <tr>
      <td align="center" style="padding: 20px;">
        
        <table class="container" width="600" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px rgba(0,0,0,0.25); max-width: 600px;">
          
          <!-- Header Security Theme -->
          <tr>
            <td style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); padding: 0; position: relative;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td class="header" style="padding: 40px; text-align: center;">
                    <div style="width: 80px; height: 80px; margin: 0 auto 20px; background: rgba(255,255,255,0.15); border-radius: 50%; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px); transition: all 0.3s ease;">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                        <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16V16H8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z"/>
                      </svg>
                    </div>
                    <h1 style="margin: 0; color: white; font-size: 28px; font-weight: 700; letter-spacing: -0.3px;">🔐 Restablece tu Contraseña</h1>
                    <p style="margin: 12px 0 0; color: rgba(255,255,255,0.9); font-size: 15px;">Solicitud de seguridad</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td class="content" style="padding: 50px 40px;">
              <div style="text-align: center; margin-bottom: 40px;">
                <h2 style="margin: 0 0 16px; color: #1a1a1a; font-size: 24px; font-weight: 600;">Hola ${userName} 👋</h2>
                <p style="margin: 0; color: #6b7280; font-size: 16px; line-height: 1.6;">Recibimos una solicitud para restablecer tu contraseña. Usa el código a continuación para continuar:</p>
              </div>
              
              <!-- Verification Code Box -->
              <div class="code-container" style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 40px; text-align: center; margin: 40px 0;">
                <p style="margin: 0 0 16px; color: #374151; font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">🔑 Tu Código de Verificación</p>
                <div class="code-box" style="background: white; border: 2px solid #dc2626; border-radius: 12px; padding: 24px; margin: 16px 0; display: inline-block; transition: all 0.3s ease;">
                  <span class="verification-code" style="font-family: 'Courier New', monospace; font-size: 36px; font-weight: 700; color: #dc2626; letter-spacing: 8px;">${verificationCode}</span>
                </div>
                <p style="margin: 16px 0 0; color: #6b7280; font-size: 13px;">⏰ Este código expira en <strong>60 minutos</strong></p>
              </div>
              
              <!-- Instructions -->
              <div style="background: linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%); border-radius: 12px; padding: 24px; margin: 40px 0;">
                <h3 style="margin: 0 0 12px; color: #0277bd; font-size: 16px; font-weight: 600;">📋 Instrucciones</h3>
                <ol style="margin: 0; padding-left: 20px; color: #0288d1; font-size: 14px; line-height: 1.6;">
                  <li style="margin-bottom: 8px;">Copia el código de verificación de arriba</li>
                  <li style="margin-bottom: 8px;">Ve a la página de restablecimiento de contraseña</li>
                  <li style="margin-bottom: 8px;">Ingresa el código cuando te lo soliciten</li>
                  <li>Crea tu nueva contraseña segura</li>
                </ol>
              </div>
              
              <!-- Security Notice -->
              <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 1px solid #fde68a; border-radius: 12px; padding: 24px; margin: 40px 0;">
                <div style="display: flex; align-items: flex-start;">
                  <div style="flex-shrink: 0; margin-right: 16px;">
                    <div style="width: 40px; height: 40px; background: #f59e0b; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 style="margin: 0 0 8px; color: #92400e; font-size: 16px; font-weight: 600;">⚠️ Aviso de Seguridad</h3>
                    <p style="margin: 0; color: #a16207; font-size: 14px; line-height: 1.5;">Si no solicitaste este restablecimiento, ignora este mensaje. Tu cuenta permanece segura y protegida.</p>
                  </div>
                </div>
              </div>
              
              <div style="text-align: center; padding-top: 32px; border-top: 1px solid #f1f5f9;">
                <p style="margin: 0; color: #6b7280; font-size: 14px;">
                  ¿Necesitas ayuda? <a href="mailto:soporte@weatherwise.app" style="color: #dc2626; text-decoration: none; font-weight: 500;">📧 Contáctanos</a>
                </p>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background: #f8fafc; padding: 30px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 16px; color: #1f2937; font-size: 16px; font-weight: 600;">💙 El equipo de WeatherWise</p>
              <p style="margin: 0; color: #64748b; font-size: 13px;">
                🔒 © 2025 WeatherWise. Enviado con seguridad desde nuestros servidores.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// Plantilla: Password Reset Success
// ...existing code...

// Plantilla: Password Reset Success - Convertir a función
export const PASSWORD_RESET_SUCCESS_TEMPLATE = (userName: string) => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Contraseña Actualizada - WeatherWise</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; max-width: 100% !important; }
      .content { padding: 30px 20px !important; }
      .header { padding: 40px 20px !important; }
      .stats-grid { display: block !important; }
      .stat-item { display: block !important; margin-bottom: 20px !important; }
      .button { padding: 14px 24px !important; font-size: 15px !important; }
      h1 { font-size: 28px !important; }
      h2 { font-size: 20px !important; }
      .tips-list { padding-left: 16px !important; }
    }
    .button:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 12px 30px rgba(16, 185, 129, 0.4) !important;
    }
    .success-icon:hover {
      transform: scale(1.1) rotate(5deg);
    }
    .stat-item:hover {
      transform: translateY(-2px);
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background: linear-gradient(135deg, #059669 0%, #047857 100%); font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #059669 0%, #047857 100%); min-height: 100vh;">
    <tr>
      <td align="center" style="padding: 20px;">
        
        <table class="container" width="600" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px rgba(0,0,0,0.15); max-width: 600px;">
          
          <!-- Header Success -->
          <tr>
            <td class="header" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 50px 40px; text-align: center;">
              <div class="success-icon" style="width: 100px; height: 100px; margin: 0 auto 24px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease;">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="white">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <h1 style="margin: 0; color: white; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">¡Contraseña Actualizada!</h1>
              <p style="margin: 16px 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">Tu cuenta está segura nuevamente</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td class="content" style="padding: 50px 40px; text-align: center;">
              <h2 style="margin: 0 0 24px; color: #1a1a1a; font-size: 24px; font-weight: 600;">Hola ${userName} 👋</h2>
              <p style="margin: 0 0 32px; color: #6b7280; font-size: 18px; line-height: 1.6;">Tu contraseña ha sido restablecida exitosamente. Ahora puedes acceder a tu cuenta con tu nueva contraseña.</p>
              
              <!-- Success Stats -->
              <div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border-radius: 16px; padding: 32px; margin: 40px 0;">
                <table class="stats-grid" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td class="stat-item" width="33.33%" style="text-align: center; transition: all 0.3s ease;">
                      <div style="color: #059669; font-size: 28px; font-weight: 700; margin-bottom: 8px;">✓</div>
                      <p style="margin: 0; color: #065f46; font-size: 14px; font-weight: 500;">Verificado</p>
                    </td>
                    <td class="stat-item" width="33.33%" style="text-align: center; transition: all 0.3s ease;">
                      <div style="color: #059669; font-size: 28px; font-weight: 700; margin-bottom: 8px;">🔒</div>
                      <p style="margin: 0; color: #065f46; font-size: 14px; font-weight: 500;">Encriptado</p>
                    </td>
                    <td class="stat-item" width="33.33%" style="text-align: center; transition: all 0.3s ease;">
                      <div style="color: #059669; font-size: 28px; font-weight: 700; margin-bottom: 8px;">🛡️</div>
                      <p style="margin: 0; color: #065f46; font-size: 14px; font-weight: 500;">Protegido</p>
                    </td>
                  </tr>
                </table>
              </div>
              
              <!-- Personal Message -->
              <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 12px; padding: 24px; margin: 40px 0;">
                <p style="margin: 0; color: #0369a1; font-size: 16px; line-height: 1.6; font-weight: 500;">
                  🎉 ¡Excelente, ${userName}! Tu cuenta está ahora más segura que nunca.
                </p>
              </div>
              
              <!-- CTA -->
              <div style="margin: 40px 0;">
                <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                  <tr>
                    <td style="border-radius: 50px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);">
                      <a href="https://weatherwise.app/login" class="button" style="display: inline-block; color: white; padding: 16px 32px; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 16px; transition: all 0.3s ease;">
                        🚀 Iniciar Sesión
                      </a>
                    </td>
                  </tr>
                </table>
              </div>
              
              <!-- Security Tips -->
              <div style="text-align: left; background: #f8fafc; border-radius: 12px; padding: 32px; margin: 40px 0;">
                <h3 style="margin: 0 0 20px; color: #1f2937; font-size: 18px; font-weight: 600;">🔐 Consejos de Seguridad</h3>
                <ul class="tips-list" style="margin: 0; padding-left: 20px; color: #6b7280; font-size: 15px; line-height: 1.6;">
                  <li style="margin-bottom: 8px;">Usa una contraseña única para WeatherWise</li>
                  <li style="margin-bottom: 8px;">Habilita la autenticación de dos factores</li>
                  <li style="margin-bottom: 8px;">Nunca compartas tus credenciales</li>
                  <li>Mantén actualizada tu información de recuperación</li>
                </ul>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background: #f8fafc; padding: 30px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 16px; color: #1f2937; font-size: 16px; font-weight: 600;">💚 El equipo de WeatherWise</p>
              <p style="margin: 0; color: #6b7280; font-size: 13px;">
                © 2025 WeatherWise. Tu seguridad es nuestra prioridad.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
