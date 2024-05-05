import { initLenis, getLenis } from "@components/core/lenis"

const main = () =>  {
    if (!getLenis()) {
        initLenis()
    }
}
export default main