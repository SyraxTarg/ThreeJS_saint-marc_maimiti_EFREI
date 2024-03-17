// V11
uniform vec2 uMouse;
uniform float time;
varying float vDistance;

attribute float affectedByMouse;
attribute float vibrationDirection;

// Mouse effect constants
const float correlationPower = 8.0;
const float directionPower = 4.6;

// Vibration effect constants
const float vibrationMagnitude = 0.1;
const float vibrationSpeed = 2.0;

vec3 calculateNewPositionBaseOnMouse() {
    vec3 newPosition = position;
    // Get the mouse position in clip space
    vec3 mousePosition = vec3(uMouse, 0);

    // get normalized vectors for push dots towards the mouse
    vec3 normalizedPosition  = normalize(position);
    vec3 normalizedMousePosition = normalize(mousePosition);

    // Get normalized direction vector from dot to mouse
    vec3 normalizedFinalDirection =  normalizedMousePosition - normalizedPosition;

    normalizedFinalDirection = normalizedFinalDirection * correlationPower;

    // Create push force
    float pushPower = (abs(position.x) + abs(position.y)) * 0.5;
    vec3 pushForce = vec3(0, 0, 0);

    pushForce.x += normalizedMousePosition.x * pow(abs(mousePosition.x), correlationPower);
    pushForce.y += normalizedMousePosition.y * pow(abs(mousePosition.y), correlationPower);

    pushForce.x += normalizedMousePosition.x * abs(mousePosition.x) * directionPower * pushPower;
    pushForce.y += normalizedMousePosition.y * abs(mousePosition.y) * directionPower * pushPower;

    float weakpush = 0.15;

    pushForce.x += (normalizedFinalDirection.x * abs(mousePosition.y) * weakpush);
    pushForce.y += (normalizedFinalDirection.y * abs(mousePosition.x) * weakpush);


    ///*
    newPosition = vec3(
    position.x + pushForce.x,
    position.y + pushForce.y,
    position.z
    );

    //newPosition = mousePosition * 7.0;

    return newPosition;
}


vec3 calculateNewPositionBaseOnVibration(vec3 newPosition) {

    float sinVal = sin(time * vibrationSpeed) * vibrationMagnitude;
    float cosVal = cos(time * vibrationSpeed) * vibrationMagnitude;

    ///*
    if (vibrationDirection < 0.25) {
        newPosition.x += sinVal;
        newPosition.y += cosVal;
    } else if (vibrationDirection < 0.5) {
        newPosition.x += sinVal;
        newPosition.y += sinVal;
    } else if (vibrationDirection < 0.75) {
        newPosition.x += cosVal;
        newPosition.y += cosVal;
    } else {
        newPosition.x += cosVal;
        newPosition.y += sinVal;
    }

    return newPosition;
}

void main() {

    vec3 newPosition;

    if (affectedByMouse > 0.5) {
        newPosition = calculateNewPositionBaseOnMouse();
    } else {
        newPosition = position;
    }

    newPosition = calculateNewPositionBaseOnVibration(newPosition);

    // Convert the position to clip space and output it
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

    // Set the size of the point
    //vDistance = length(position);
    vDistance = length(vec3(newPosition.x, newPosition.y, 0));

    gl_PointSize = 2.0;
}