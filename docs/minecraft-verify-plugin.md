# In-game `/verify` → website

When a player registers on the site they get a code like `FM-A7K2QX`.
In-game they run:

```
/verify FM-A7K2QX
```

Your plugin should call the website:

```http
POST /api/auth/confirm-verify
Authorization: Bearer <AUTH_PLUGIN_SECRET>
Content-Type: application/json

{
  "username": "Steve",
  "code": "FM-A7K2QX"
}
```

## Responses

| Status | Meaning |
|--------|---------|
| `200` `{ ok: true }` | Account verified |
| `200` `{ ok: true, alreadyVerified: true }` | Already done |
| `400` | Wrong / expired code |
| `401` | Bad plugin secret |
| `404` | No pending registration for that name |

Tell the player in chat:

- Success: `You're verified. Log in on the website.`
- Fail: `Wrong or expired code. Get a new one on the site.`

The registration page polls `/api/auth/verify-status?username=Steve` every few seconds and advances when status is `verified`.
