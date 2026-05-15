const GITHUB_USER = "YOUR_USERNAME";
const REPO = "YOUR_REPO";
const FILE_PATH = "data.json";
const TOKEN = "YOUR_GITHUB_TOKEN";

async function syncToGitHub() {
    const url = `https://api.github.com/repos/${GITHUB_USER}/${REPO}/contents/${FILE_PATH}`;

    const content = btoa(JSON.stringify(inventory, null, 2));

    let sha = null;

    try {
        const res = await fetch(url, {
            headers: { Authorization: `token ${TOKEN}` }
        });
        const data = await res.json();
        sha = data.sha;
    } catch (e) {}

    await fetch(url, {
        method: "PUT",
        headers: {
            Authorization: `token ${TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: "update inventory",
            content,
            sha
        })
    });
}
