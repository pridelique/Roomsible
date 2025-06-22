function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const animateDemo = async (
  isAnimatedRef,
  zoomPanRef,
  zoomingRef,
  maxScale,
  setAnimationState
) => {
  const clearAnimation = () => {
    isAnimatedRef.current = false;
    setAnimationState("");
  };
  if (isAnimatedRef.current) return;
  isAnimatedRef.current = true;
  setTimeout(async () => {
    const ref = zoomPanRef.current;
    if (!ref) {
      clearAnimation();
      return;
    }

    if (zoomingRef.current) {
      isAnimatedRef.current = false;
      return;
    }

    ref.centerView(maxScale, 500);
    await sleep(600);

    const { positionX, positionY } = ref.state;

    if (zoomingRef.current) {
      clearAnimation();
      return;
    }
    ref.setTransform(positionX - 100, positionY, maxScale, 1000);
    setAnimationState("right");
    await sleep(1100);

    if (zoomingRef.current) {
      clearAnimation();
      return;
    }
    ref.setTransform(positionX, positionY, maxScale, 1000);
    setAnimationState("left");
    await sleep(1100);

    if (zoomingRef.current) {
      clearAnimation();
      return;
    }
    ref.centerView(maxScale - 0.3, 1000);
    setAnimationState("zoom out");
    await sleep(1100);

    if (zoomingRef.current) {
      clearAnimation();
      return;
    }
    ref.centerView(maxScale, 1000);
    setAnimationState("zoom in");
    await sleep(1100);
    
    isAnimatedRef.current = false;
    setAnimationState("");
    animateDemo(
      isAnimatedRef,
      zoomPanRef,
      zoomingRef,
      maxScale,
      setAnimationState
    );
  }, 500);
};
