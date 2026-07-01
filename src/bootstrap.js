import ToolRegistry from "./core/registry/ToolRegistry.js";
import Dispatcher from "./core/dispatcher/Dispatcher.js";
import Executor from "./core/executor/Executor.js";

import OllamaClient from "./core/ai/clients/ollamaClient.js";

import GoalPlanner from "./core/planner/GoalPlanner.js";
import GoalPromptBuilder from "./core/planner/prompts/GoalPromptBuilder.js";

import FileSystemTool from "./tools/filesystem/FileSystemTools.js";

const registry = new ToolRegistry();

const fileSystemTool = new FileSystemTool();

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

const dispatcher = new Dispatcher(registry);

const executor = new Executor(dispatcher);

export default {
    planner,
    executor
};