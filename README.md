
# Prompt to Prototype Vibe Coding Challenge Starter

The SkillUp AI **Prompt to Prototype** is a fast-paced AI-powered creation challenge.  
In one hour, you’ll take an idea from a concept to a working **web-based prototype** using Copilot, Researcher Agent, GitHub Copilot, or no-code React-based builders.

You’ll go through **six key stages**:

1.  Ideation — get or refine your idea
    
2.  Research — validate and explore your concept
    
3.  PRD — define your product requirements
    
4.  Branding — give your product a look, feel, and personality
    
5.  Prototype — build your MVP
    
6.  Submit — package your work for sharing

Visit [https://aka.ms/skillupai/ptpchallenge](https://aka.ms/skillupai/ptpchallenge) to learn more about the Challenge and get started. 


# Starter Scaffold (React + Vite)

A tiny scaffold to help you build a **quiz, game, site, dashboard, or landing page** in under an hour.
Works great in **GitHub Codespaces** and includes **Copilot instructions** to steer your build.

## Quickstart

**Option A — Codespaces**  
1. Open this repo in GitHub and click **Code → Codespaces → Create codespace**.  
2. The dev container installs Node and runs `npm install` automatically.  
3. Run `npm run dev` to start the dev server.

**Option B — Local**  
1. Install **Node.js 18+**.  
2. `npm install`  
3. `npm run dev`

Then open the URL shown in your terminal.

## Structure

```
.
├── .devcontainer/
│   └── devcontainer.json
├── .github/
│   └── copilot-instructions.md
├── src/
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
├── .editorconfig
└── README.md
```

## Copilot Instructions

This repo includes **custom Copilot instructions** in `.github/copilot-instructions.md` designed to help you speed-run a tiny web MVP in under an hour. The instructions:

- **Keep scope minimal** — Focus on one clear user action (e.g., answer 5 questions, click-to-start mini-game, submit an email)
- **Prefer plain React + Vite** — Avoid heavy frameworks unless explicitly needed
- **Follow a 5-step build flow** — Confirm MVP goal → Sketch UI → Wire interaction → Add finishing touch → Ship
- **Include ready-to-use prompts** — Copy/paste prompts to guide your Copilot chat sessions

The instructions help Copilot understand your project context and provide more targeted assistance for rapid prototyping. Simply mention your idea and Copilot will guide you through the structured build process.

## Tips

- Delete anything you don't need. Keep it **lean**.
- Use the **Prompts** inside `.github/copilot-instructions.md` as your running chat with Copilot.
- Aim for a **single, clear MVP** first (one page, one core action).
- If you need routing later, add it (e.g., `react-router-dom`) *after* your MVP works. If you want to submit your project to be aggregated, you need to use HashRouter. 
- See the Prompt to Prototype Challenge Submission Repo at [https://aka.ms/skillupai/ptp/submissions/repo](https://aka.ms/skillupai/ptp/submissions/repo) to learn more. 

## License

MIT
