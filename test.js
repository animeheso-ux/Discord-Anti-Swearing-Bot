import test from "node:test";
import assert from "node:assert/strict";

// Bot logic
function handleMessage(message, botUser) {
    if (message.author.bot) return;

    const user = message.mentions.users.first();

    if (!user) return;

    if (user.id === botUser.id) {
        message.reply("Hello!");
    }
}

// Test 1: Ignore messages from bots
test("ignores bot messages", () => {
    let replied = false;

    const message = {
        author: { bot: true },
        mentions: { users: { first: () => null } },
        reply: () => { replied = true; }
    };

    handleMessage(message, { id: "bot123" });

    assert.equal(replied, false);
});

// Test 2: Reply when mentioned
test("replies when mentioned", () => {
    let replyText = "";

    const message = {
        author: { bot: false },
        mentions: {
            users: { first: () => ({ id: "bot123" }) }
        },
        reply: (text) => { replyText = text; }
    };

    handleMessage(message, { id: "bot123" });

    assert.equal(replyText, "Hello!");
});

// Test 3: Ignore mentions of other users
test("ignores mentions of other users", () => {
    let replied = false;

    const message = {
        author: { bot: false },
        mentions: {
            users: { first: () => ({ id: "user456" }) }
        },
        reply: () => { replied = true; }
    };

    handleMessage(message, { id: "bot123" });

    assert.equal(replied, false);
});

// Test 4: Ignore messages without mentions
test("ignores messages without mentions", () => {
    let replied = false;

    const message = {
        author: { bot: false },
        mentions: { users: { first: () => null } },
        reply: () => { replied = true; }
    };

    handleMessage(message, { id: "bot123" });

    assert.equal(replied, false);
});
