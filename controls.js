const ERD = 0.004;
const CRD = 0.003;
const MRD = 0.009;
const MOD = 0.008;

function earthRotationUp() {
  if (earthRotation <= 0.1) earthRotation += 0.01;
}

function earthRotationDown() {
  if (earthRotation >= 0.014) earthRotation -= 0.01;
}

function earthRotationReverse() {
  earthRotation *= -1;
}

function earthRotationReset() {
  earthRotation = ERD;
}

function cloudRotationUp() {
  if (cloudRotation <= 0.1) cloudRotation += 0.01;
}

function cloudRotationDown() {
  if (cloudRotation >= 0.013) cloudRotation -= 0.01;
}

function cloudRotationReverse() {
  cloudRotation *= -1;
}

function cloudRotationReset() {
  cloudRotation = 0.003;
}

function moonRotationUp() {
  if (moonRotation <= 0.1) moonRotation += 0.01;
}

function moonRotationDown() {
  if (moonRotation >= 0.019) moonRotation -= 0.01;
}

function moonRotationReverse() {
  moonRotation *= -1;
}

function moonRotationReset() {
  moonRotation = 0.009;
}

function moonOrbitUp() {
  if (moonOrbit <= 0.1) moonOrbit += 0.01;
}

function moonOrbitDown() {
  if (moonOrbit >= 0.019) moonOrbit -= 0.01;
}

function moonOrbitReverse() {
  moonOrbit *= -1;
}

function moonOrbitReset() {
  moonOrbit = 0.008;
}

function defaultValues() {
  earthRotation = 0.004;
  cloudRotation = 0.003;
  moonRotation = 0.009;
  moonOrbit = 0.008;
}
