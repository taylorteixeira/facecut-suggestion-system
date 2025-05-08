# FaceCut - Sistema de Sugestão de Cortes de Cabelo e Barba

O FaceCut é um sistema inteligente que utiliza reconhecimento facial para sugerir cortes de cabelo e barba personalizados baseados no formato do rosto do usuário.

## 🚀 Funcionalidades

- **Detecção Facial em Tempo Real**: Utiliza o MediaPipe Face Mesh para detectar e analisar o formato do rosto do usuário.
- **Análise de Formato Facial**: Identifica automaticamente o formato do rosto (oval, redondo, quadrado, coração, longo, diamante ou triangular).
- **Sugestões Personalizadas**:
  - Recomenda cortes de cabelo ideais para o formato do rosto
  - Sugere estilos de barba que complementam o formato facial
- **Interface Intuitiva**: Design moderno e responsivo com feedback visual em tempo real.

## 🛠️ Tecnologias Utilizadas

- **Frontend**:
  - React
  - TypeScript
  - Tailwind CSS
  - Shadcn/ui (componentes de interface)
  - MediaPipe Face Mesh (detecção facial)

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Webcam funcional

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/taylorteixeira/facecut-suggestion-system.git
cd facecut-suggestion-system
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

4. Acesse o projeto em `http://localhost:5173`

## 🎯 Como Usar

1. **Iniciar a Câmera**:

   - Clique no botão "Iniciar Câmera"
   - Permita o acesso à webcam quando solicitado

2. **Capturar Imagem**:

   - Posicione seu rosto no centro do enquadramento
   - Clique em "Tirar Foto" quando estiver pronto

3. **Análise e Recomendações**:
   - O sistema analisará automaticamente o formato do seu rosto
   - Você receberá sugestões personalizadas de cortes de cabelo e barba
   - As recomendações são baseadas em princípios de design facial e harmonia

## 📱 Compatibilidade

- Navegadores modernos (Chrome, Firefox, Safari, Edge)
- Requer acesso à webcam
- Funciona melhor em dispositivos com boa iluminação

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ✨ Recursos Adicionais

- [Documentação do MediaPipe Face Mesh](https://google.github.io/mediapipe/solutions/face_mesh)
- [Guia de Formatos de Rosto](https://www.hair.com/advice/face-shapes-guide.html)
- [Tendências de Cortes de Cabelo](https://www.menshairstylestoday.com/mens-haircuts/)
