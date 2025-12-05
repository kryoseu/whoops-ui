import {
  writeFileSync,
  copyFileSync,
  readFileSync,
  existsSync,
  mkdirSync,
} from "fs";
import { join } from "path";
import YAML from "js-yaml";
import { validateDashboardConfig } from "./dashboards";

export const CONF_DIR = "/app/config";
export const VALID_CONFIGS = ["default.yaml", "custom.yaml"];

export function checkConfig(config) {
  if (!existsSync(CONF_DIR)) {
    try {
      mkdirSync(CONF_DIR, { recursive: true });
    } catch (e) {
      console.warn(
        `Could not create config directory ${CONF_DIR}: ${e.message}`,
      );
      return false;
    }
  }
  const configYaml = join(CONF_DIR, config);

  if (!existsSync(configYaml)) {
    const skeleton = join(process.cwd(), "src", "skeleton", config);
    try {
      copyFileSync(skeleton, configYaml);
    } catch (e) {
      console.warn(
        `Could not copy skeleton config file to ${configYaml}: ${e.message}`,
      );
      return false;
    }
    return true;
  }

  try {
    YAML.load(readFileSync(configYaml, "utf8"));
  } catch (e) {
    console.warn(`Could not read config file ${configYaml}: ${e.message}`);
    return false;
  }

  return true;
}

export function readConfig(config) {
  if (!checkConfig(config)) {
    return null;
  }

  const configYaml = join(CONF_DIR, config);

  try {
    const data = YAML.load(readFileSync(configYaml, "utf8")) || {};

    // Validate each dashboard
    Object.values(data).forEach((dashboard) => {
      if (!validateDashboardConfig(dashboard)) {
        return null;
      }
    });

    return data;
  } catch (e) {
    console.warn(`Could not read config file ${configYaml}: ${e.message}`);
    return null;
  }
}

export function writeConfig(config, data) {
  if (!checkConfig(config)) {
    return false;
  }

  const configYaml = join(CONF_DIR, config);

  try {
    writeFileSync(configYaml, YAML.dump(data), "utf8");
  } catch (e) {
    console.warn(`Could not write config file ${configYaml}: ${e.message}`);
    return false;
  }
  return true;
}

export function appendConfig(config, data) {
  if (!checkConfig(config)) {
    return false;
  }

  const configYaml = join(CONF_DIR, config);

  try {
    const existing = YAML.load(readFileSync(configYaml, "utf8")) || [];

    const configList = Array.isArray(existing) ? existing : [existing];

    configList.push(data);

    writeFileSync(configYaml, YAML.dump(configList), "utf8");
  } catch (e) {
    console.warn(`Could not write config file ${configYaml}: ${e.message}`);
    return false;
  }
  return true;
}

export function isValidConfig(config) {
  return VALID_CONFIGS.includes(config);
}
