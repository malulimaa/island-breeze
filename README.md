<div align="center">

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:9bd7c5,50:7fbf9b,100:f3d58a&height=140&section=header&text=IslandBreeze&fontSize=42&fontColor=fffaf0&fontAlignY=38&desc=Um%20cantinho%20tropical%20para%20acompanhar%20o%20tempo&descAlignY=62&descSize=15&animation=fadeIn" />

### O clima da sua ilha, onde quer que você esteja 🌴

[![Angular](https://img.shields.io/badge/Angular-22-3d7656?style=flat-square&logo=angular&logoColor=fffaf0)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3d7656?style=flat-square&logo=typescript&logoColor=fffaf0)](https://www.typescriptlang.org/)
[![Open-Meteo](https://img.shields.io/badge/Weather-Open--Meteo-3d7656?style=flat-square&logo=cloudflare&logoColor=fffaf0)](https://open-meteo.com/)
[![Netlify](https://img.shields.io/badge/Deploy-Netlify-3d7656?style=flat-square&logo=netlify&logoColor=fffaf0)](https://www.netlify.com/)

[**Ver projeto no ar**](https://nookislandweather.netlify.app/)

</div>

## 🏝️ Sobre o projeto

O **IslandBreeze** é um aplicativo de previsão do tempo com clima de ilha tropical. A interface foi inspirada no universo acolhedor de *Animal Crossing: New Horizons*: cores suaves, paisagens ensolaradas e uma experiência leve para consultar o tempo de qualquer cidade.

Os dados meteorológicos e as informações de localização são obtidos pela API do [Open-Meteo](https://open-meteo.com/). A busca começa por São Paulo e você pode procurar outros lugares pelo nome.

## 🍃 Prévia

<p align="center">
  <img src="src/assets/images/docs/screenshot.jpeg" alt="Prévia do IslandBreeze mostrando o clima atual e a previsão do tempo" width="90%">
</p>

> Para adicionar sua imagem, salve a captura de tela como `screenshot.png` dentro de uma pasta `docs` na raiz do projeto. Se preferir outro caminho ou nome, atualize o `src` acima.

## ☀️ Funcionalidades

- **Buscar cidades e ilhas:** encontre lugares pelo nome e selecione uma sugestão.
- **Ver o clima atual:** consulte temperatura, sensação térmica, umidade e velocidade do vento.
- **Acompanhar o dia:** veja a previsão em diferentes períodos, do nascer do sol à noite.
- **Planejar a semana:** confira a previsão para os próximos sete dias, com temperaturas máximas e mínimas, chuva e vento.
- **Alternar unidades:** escolha entre Celsius e Fahrenheit.
- **Tema diurno e noturno:** a paisagem acompanha a condição de dia ou noite informada para o local.

## 🌱 Tecnologias

- **Angular 22** para a aplicação web.
- **TypeScript** para a lógica e os componentes.
- **Angular Forms** para a busca de locais.
- **Open-Meteo Forecast e Geocoding APIs** para previsão do tempo e busca de localidades.
- **CSS** para a interface responsiva e as animações visuais.
- **Netlify** para publicação do projeto.

## 🐚 Como executar localmente

### Requisitos

- Node.js compatível com o Angular CLI do projeto.
- npm.

### Instalação

Clone o repositório e entre na pasta:

```bash
git clone https://github.com/malulimaa/island-breeze.git
cd island-breeze
```

Instale as dependências e inicie o servidor de desenvolvimento:

```bash
npm install
npm start
```

A aplicação ficará disponível em [http://localhost:4200](http://localhost:4200). O servidor recarrega a página quando os arquivos são alterados.

Para gerar a versão de produção:

```bash
npm run build
```

Os arquivos compilados são gerados na pasta `dist/`.

## 🗺️ Estrutura do projeto

```text
src/
├── app/
│   ├── services/
│   │   └── weather.ts       # Consultas às APIs do Open-Meteo
│   ├── app.html              # Estrutura da tela
│   ├── app.css               # Estilos da aplicação
│   └── app.ts                # Busca, clima atual e previsões
├── assets/images/            # Ícones e ilustrações do clima
├── main.ts
└── styles.css                # Estilos globais
```

## 🌺 Créditos

Projeto desenvolvido por [malulimaa](https://github.com/malulimaa). Dados meteorológicos fornecidos pelo [Open-Meteo](https://open-meteo.com/).

A interface é um projeto independente, inspirado no estilo aconchegante de *Animal Crossing: New Horizons*.

<div align="center">

<img width="100%" src="https://capsule-render.vercel.app/api?type=rect&color=9bd7c5&height=3&width=100%" />

*Feito com carinho e uma brisa tropical 🌴*

</div>
