import * as React from "react"
import Svg, { Circle, Rect, G, Path, Filter, Defs, Stop, FeFlood, FeColorMatrix, FeOffset, FeGaussianBlur, FeComposite, FeBlend, LinearGradient, ClipPath } from "react-native-svg"

const HomeIcon = ({ width = 20, height = 20, color = 'rgba(189, 189, 189, 1)' }) => (
    <Svg width="25" height="25" viewBox="0 0 25 25" fill="none">
        <Path
            d="M6.50093 3.04205H18.5086C18.4422 2.22912 17.949 1.78571 17.0385 1.78571H7.96158C7.06053 1.78571 6.55784 2.22912 6.50093 3.04205ZM4.56605 5.71179H20.4435C20.3107 4.83419 19.8554 4.33535 18.85 4.33535H6.15949C5.1541 4.33535 4.69884 4.83419 4.56605 5.71179ZM5.68525 22.3214H19.3148C21.2876 22.3214 22.3214 21.3238 22.3214 19.4207V10.1182C22.3214 8.21524 21.2876 7.21756 19.3148 7.21756H5.68525C3.70294 7.21756 2.67859 8.206 2.67859 10.1182V19.4207C2.67859 21.3238 3.70294 22.3214 5.68525 22.3214Z"
            fill={color}
        />
    </Svg>

)

export default HomeIcon
