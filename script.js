class TreasureMap {
    static async getInitialClue() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("在古老的图书馆里找到了第一个线索...");
            }, 1000);
        });
    }

    static async decodeAncientScript(clue) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const random = Math.random();
                if (random < 0.2) {
                    reject("解码失败!请再试一次...");
                } else {
                    resolve("解码成功!宝藏在一座古老的神庙中...");
                }
            }, 1500);
        });
    }

    static async encounterMysticalCreature() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const random = Math.random();
                if (random < 0.3) {
                    reject("神秘生物不高兴了，它把你吓跑了！");
                } else {
                    resolve("你遇到了一只神秘生物，它指引你找到了宝藏的线索!");
                }
            }, 2000);
        });
    }

    static async searchTemple(hasArtifacts) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const random = Math.random();
                if (hasArtifacts) {
                    resolve("你用古老神器击败了神庙守卫，成功找到了宝藏!");
                } else {
                    // 如果没有神器，有70%概率遇到守卫
                    if (random < 0.7) {
                        reject("糟糕!由于你没有获得神器，而且运气不好遇到了神庙守卫!你被他杀死了！");
                    } else {
                        resolve("找到了传说中的宝藏!");
                    }
                }
            }, 2000);
        });
    }

    static async collectAncientArtifacts() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("你收集了一些古老的神器，它们会帮助你在冒险中!");
            }, 1500);
        });
    }
}

async function findTreasure() {
    let hasArtifacts = false; // 初始化神器收集状态

    try {
        let clue = await TreasureMap.getInitialClue();
        displayStep("step1", clue, "images/library.jpg");
        await sleep(2000);

        let location = await TreasureMap.decodeAncientScript(clue);
        displayStep("step2", location, "images/temple.jpg");
        await sleep(2000);

        let creatureEncounter = await TreasureMap.encounterMysticalCreature();
        displayStep("step3", creatureEncounter, "images/mystical_creature.jpg");
        await sleep(2000);

        const artifactChance = Math.random();
        if (artifactChance < 0.5) {
            hasArtifacts = true; // 50% 的几率获得神器
            let artifacts = await TreasureMap.collectAncientArtifacts();
            displayStep("step4", artifacts, "images/artifacts.jpg");
            await sleep(2000);
        } else {
            displayStep("step4", "你没有获得古老的神器，继续前进吧!", "images/no_artifacts.jpg");
            await sleep(2000);
        }

        let result = await TreasureMap.searchTemple(hasArtifacts);
        displayStep("step5", result, "images/treasure.jpg");
        await sleep(2000);

        document.getElementById("result").innerText = "恭喜你！你成功找到了宝藏！";
        document.getElementById("result").style.display = "block";
        document.getElementById("restart-button").classList.remove("hidden");
    } catch (error) {
        handleTreasureError(error);
    }
}

function handleTreasureError(error) {
    // 确保只显示一次错误信息
    if (!document.getElementById("result").innerText) {
        hideSteps();
        document.getElementById("result").innerText = error;
        document.getElementById("result").style.display = "block";
        document.getElementById("restart-button").classList.remove("hidden");

        // 检查错误信息以确定是否显示守卫的图片
        if (error.includes("神庙守卫")) {
            displayStep("step5", error, "images/guard.jpg"); // 显示守卫的图片
        }
    }
}

function hideSteps() {
    const steps = document.querySelectorAll("#steps > div");
    steps.forEach(step => {
        step.style.display = "none";
    });
}

function displayStep(stepId, message, imageSrc) {
    const stepElement = document.getElementById(stepId);
    const imgElement = stepElement.querySelector("img");
    const textElement = stepElement.querySelector(".step-text");

    imgElement.src = imageSrc;
    imgElement.alt = message;
    textElement.innerText = message;

    stepElement.style.display = "block";
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.getElementById("start-button").addEventListener("click", () => {
    document.getElementById("steps").style.display = "block";
    findTreasure();
    document.getElementById("start-button").classList.add("hidden");
});

document.getElementById("restart-button").addEventListener("click", () => {
    location.reload();
});
