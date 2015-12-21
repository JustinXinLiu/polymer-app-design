/* global KeyframeEffect */

class RotateAnticlockwiseAnimation {
  get behaviors() {
    return [Polymer.NeonAnimationBehavior];
  }

  beforeRegister() {
    this.is = 'rotate-in-animation';
    this.properties = {
      configure: (config) => {
        var node = config.node;

        if (config.transformOrigin) {
          this.setPrefixedProperty(node, 'transformOrigin', config.transformOrigin);
        } else {
          this.setPrefixedProperty(node, 'transformOrigin', '50% 50%');
        }

        this._effect = new KeyframeEffect(node, [
          {'transform': 'rotate(0)'},
          {'transform': 'rotate(-360deg)'}
        ], this.timingFromConfig(config));

        return this._effect;
      }
    };
  }
}

Polymer(RotateAnticlockwiseAnimation);
