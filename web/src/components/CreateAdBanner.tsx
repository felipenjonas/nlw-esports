import * as Dialog from '@radix-ui/react-dialog';
import { ButtonCreateAd } from "./ButtonCreateAd";

interface CreateAdBannerProps {
    titleBold: string,
    titleNormal: string
}

export function CreateAdBanner(props: CreateAdBannerProps) {
    return (
        <div className='pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden mt-8'>
            <div className='bg-[#2A2634] px-8 py-6 flex justify-between items-center'>
                <div>
                    <strong className='text-2xl text-white front-black block'>{props.titleBold}</strong>
                    <span className='text-zinc-400'>{props.titleNormal}</span>
                </div>
                <Dialog.Trigger>
                    <ButtonCreateAd title="Publicar anúncio" />
                </Dialog.Trigger>
            </div>
        </div>
    )
}