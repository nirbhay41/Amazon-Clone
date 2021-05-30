import styles from './Banner.module.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function Banner() {

    return (
        <div className={styles.banner}>
            <div className={styles.fadeOverlay} />
            <Carousel autoPlay infiniteLoop showStatus={false} showThumbs={false} showIndicators={false}>
                <div>
                    <img loading="lazy" src='/banners/img1.jpg'/>
                </div>
                <div>
                    <img loading="lazy" src='/banners/img2.jpg'/>
                </div>
                <div>
                    <img loading="lazy" src='/banners/img3.jpg'/>
                </div>
            </Carousel>
        </div>
    )
}
