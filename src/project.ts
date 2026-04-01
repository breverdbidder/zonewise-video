import {makeProject} from '@revideo/core';

import scene1Pain from './scenes/scene1-pain';
import scene2OldWay from './scenes/scene2-oldway';
import scene3Breakthrough from './scenes/scene3-breakthrough';
import scene4Pipeline from './scenes/scene4-pipeline';
import scene5Product from './scenes/scene5-product';
import scene6Moat from './scenes/scene6-moat';
import scene7CTA from './scenes/scene7-cta';

export default makeProject({
  name: 'ZoneWise GTM v2',
  scenes: [
    scene1Pain,
    scene2OldWay,
    scene3Breakthrough,
    scene4Pipeline,
    scene5Product,
    scene6Moat,
    scene7CTA,
  ],
  settings: {
    size: {x: 1920, y: 1080},
    background: '#FFFFFF',
    fps: 30,
  },
});
