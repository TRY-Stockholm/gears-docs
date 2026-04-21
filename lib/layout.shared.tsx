import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: appName,
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    links: [
      {
        text: 'Guides',
        url: '/docs',
        active: 'nested-url',
      },
      {
        text: 'Tutorial',
        url: '/docs/guides/tutorial',
      },
      {
        text: 'LLMs',
        url: '/llms.txt',
        external: true,
      },
    ],
  };
}
