import heroCentrifugalPump from './hero-centrifugal-pump.jpg'
import productElectricMotors from './product-electric-motors.jpg'
import productSubmersiblePumps from './product-submersible-pumps.jpg'
import productSurfacePumps from './product-surface-pumps.jpg'

export interface TorqImageAsset {
  id: 'heroPump' | 'electricMotors' | 'submersiblePumps' | 'surfacePumps'
  src: string
  alt: string
  figmaNodeId: string
  slot: string
  aspectRatio: string
}

export const torqImages = {
  heroPump: {
    id: 'heroPump',
    src: heroCentrifugalPump,
    alt: 'Centrifugal pump — studio photograph',
    figmaNodeId: '2:70',
    slot: 'Hero — Pump showcase',
    aspectRatio: '648 / 480',
  },
  electricMotors: {
    id: 'electricMotors',
    src: productElectricMotors,
    alt: 'Electric motors product photography',
    figmaNodeId: '2:176',
    slot: 'Product collection — Electric motors',
    aspectRatio: '438 / 275',
  },
  submersiblePumps: {
    id: 'submersiblePumps',
    src: productSubmersiblePumps,
    alt: 'Submersible pumps product photography',
    figmaNodeId: '2:184',
    slot: 'Product collection — Submersible pumps',
    aspectRatio: '438 / 275',
  },
  surfacePumps: {
    id: 'surfacePumps',
    src: productSurfacePumps,
    alt: 'Surface pumps product photography',
    figmaNodeId: '2:192',
    slot: 'Product collection — Surface pumps',
    aspectRatio: '438 / 275',
  },
} as const satisfies Record<string, TorqImageAsset>

export const torqImageList: readonly TorqImageAsset[] = [
  torqImages.heroPump,
  torqImages.electricMotors,
  torqImages.submersiblePumps,
  torqImages.surfacePumps,
]
