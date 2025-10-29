# kamesstory.github.io

Personal website setup reference.

## Infrastructure

- **Hosting**: GitHub Pages (from this repo)
- **Domain**: DomainKing.ng
- **DNS & Email**: Cloudflare

## Setup Checklist

### GitHub Pages

- Enable Pages in repo settings → Pages
- Set source to deploy from branch (usually `master` or `main`)
- Custom domain configured in repo settings

### Domain Configuration (DomainKing.ng)

- Point nameservers to Cloudflare's nameservers
- Usually: `ns1.cloudflare.com` and `ns2.cloudflare.com` (check Cloudflare dashboard for exact values)

### Cloudflare

- **DNS Records**:

  - `A` records pointing to GitHub Pages IPs:
    - `185.199.108.153`
    - `185.199.109.153`
    - `185.199.110.153`
    - `185.199.111.153`
  - `CNAME` for `www` → `kamesstory.github.io`
  - Email routing records (MX, TXT, etc.) as configured

- **SSL/TLS**: Set to "Full" or "Full (strict)"
- **Email Routing**: Configure in Cloudflare dashboard → Email Routing

## Development

Clone, edit, push to `master`. GitHub Pages auto-deploys.

## Troubleshooting

- DNS propagation can take 24-48 hours
- Verify GitHub Pages custom domain setting matches Cloudflare DNS
- Check Cloudflare SSL/TLS mode if getting certificate errors
