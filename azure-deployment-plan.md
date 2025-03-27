# Azure Static Web Apps Deployment Plan

## 1. Next.js Configuration Updates

Update `next.config.ts` to include:

```typescript
const nextConfig: NextConfig = {
  output: "export",
  pageExtensions: ["ts", "tsx", "js", "jsx"],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    return config;
  },
  images: {
    unoptimized: true,
  },
};
```

## 2. Environment Configuration

Create `.env.production` with:

```
NEXT_PUBLIC_BASE_URL=https://www.danielfullerton.com
```

Update `Seo.tsx` to use base URL for canonical and OpenGraph URLs.

## 3. Package.json Updates

Update scripts section:

```json
{
  "scripts": {
    "dev": "next dev -H 0.0.0.0",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "export": "next build"
  }
}
```

## 4. Azure Static Web Apps Configuration

Create `staticwebapp.config.json`:

```json
{
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": ["/images/*", "/*.{png,jpg,gif,svg,ico}", "/*.{css,scss,js}"]
  },
  "globalHeaders": {
    "content-security-policy": "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff"
  }
}
```

## 5. GitHub Actions Workflow

Create `.github/workflows/azure-static-web-apps.yml`:

```yaml
name: Azure Static Web Apps CI/CD

on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize, reopened, closed]
    branches:
      - main

jobs:
  build_and_deploy_job:
    if: github.event_name == 'push' || (github.event_name == 'pull_request' && github.event.action != 'closed')
    runs-on: ubuntu-latest
    name: Build and Deploy Job
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "20"
          cache: "npm"

      - name: Build And Deploy
        id: builddeploy
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: "upload"
          app_location: "/"
          output_location: "out"
          app_build_command: "npm run export"

  close_pull_request_job:
    if: github.event_name == 'pull_request' && github.event.action == 'closed'
    runs-on: ubuntu-latest
    name: Close Pull Request Job
    steps:
      - name: Close Pull Request
        id: closepullrequest
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          action: "close"
```

## 6. Implementation Steps

1. Create all configuration files
2. Update existing files with new configurations
3. Test the static export locally using `npm run export`
4. Set up Azure Static Web Apps resource in Azure Portal
5. Configure GitHub repository secrets:
   - Add `AZURE_STATIC_WEB_APPS_API_TOKEN` from Azure Portal
6. Push changes to trigger deployment

## Notes

- Ensure all dynamic routes are properly handled for static generation
- Test all internal links after deployment
- Verify SEO meta tags and OpenGraph images are working with absolute URLs
- Monitor first deployment for any potential issues
