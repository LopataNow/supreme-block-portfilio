import {describe, expect, test} from '@jest/globals';
import { createDefaultParticleSettings } from './particle';

describe('create default particle settings', () => {
  test('should create default particle settings', () => {
      const particleSettings = createDefaultParticleSettings();
      expect(particleSettings).toEqual({
          radius: 2,
          moveRadius: 6,
          moveSpeed: 0.05,
      });
  });

  test('should create default particle settings with custom settings', () => {
      let particleSettings = createDefaultParticleSettings({
          radius: 3,
          moveRadius: 7,
          moveSpeed: 0.06,
      });
      expect(particleSettings).toEqual({
          radius: 3,
          moveRadius: 7,
          moveSpeed: 0.06,
      });

      particleSettings = createDefaultParticleSettings({
          radius: 4,
      });

      expect(particleSettings).toEqual({
          radius: 4,
          moveRadius: 6,
          moveSpeed: 0.05,
      });
  });
});