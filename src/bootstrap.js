import ToolRegistry from "./core/registry/ToolRegistry.js";
import Dispatcher from "./core/dispatcher/Dispatcher.js";
import Executor from "./core/executor/Executor.js";
import CLI from "./cli/CLI.js";
import ConsoleReader from "./cli/ConsoleReader.js";

import OllamaClient from "./core/ai/clients/ollamaClient.js";

import GoalPlanner from "./core/planner/GoalPlanner.js";
import GoalPromptBuilder from "./core/planner/prompts/GoalPromptBuilder.js";

import FileSystemTool from "./tools/filesystem/FileSystemTools.js";

import WorkspaceManager from "./workspace/WorkspaceManager.js";

const workspace = new WorkspaceManager();

const registry = new ToolRegistry();

const fileSystemTool = new FileSystemTool(workspace);

registry.register("filesystem", fileSystemTool);

const aiClient = new OllamaClient(
    "http://localhost:11434",
    "qwen3:8b"
);

const promptBuilder = new GoalPromptBuilder();

const planner = new GoalPlanner(
    aiClient,
    promptBuilder,
    registry
);

const dispatcher = new Dispatcher(registry, workspace);

const executor = new Executor(dispatcher);

const consoleReader = new ConsoleReader();


const cli = new CLI(
    planner,
    executor,
    consoleReader
);


export default {
    planner,
    executor,
    cli
};