import type { ConfigContext, ExpoConfig } from 'expo/config';

// Build produksi (EAS profile "production") tidak boleh memakai HTTP polos.
const isProduction =
  process.env.EAS_BUILD_PROFILE === 'production' || process.env.APP_ENV === 'production';

type Plugin = NonNullable<ExpoConfig['plugins']>[number];

export default ({ config }: ConfigContext): ExpoConfig => {
  const plugins: Plugin[] = [...(config.plugins ?? []), 'expo-secure-store'];

  if (!isProduction) {
    plugins.push(['expo-build-properties', { android: { usesCleartextTraffic: true } }]);
  }

  return { ...config, plugins } as ExpoConfig;
};
