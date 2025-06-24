import { FC } from "react";
import { isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@/components/PrismicRichText";

interface AccordionItemProps {
    panel: any;
    index: number;
    isActive: boolean;
    activeWidth: number;
    inactiveWidth: number;
    onPanelClick: (index: number) => void;
    panelRef: (el: HTMLDivElement | null) => void;
}

const AccordionItem: FC<AccordionItemProps> = ({
    panel,
    index,
    isActive,
    activeWidth,
    inactiveWidth,
    onPanelClick,
    panelRef
}) => {
    return (
        <div
            ref={panelRef}
            className={`
        relative cursor-pointer  
        ${isActive ? 'shadow-2xl' : 'shadow-lg hover:shadow-xl'}
      `}
            onClick={() => onPanelClick(index)}
            style={{
                width: isActive ? `${activeWidth}%` : `${inactiveWidth}%`
            }}
        >
            {/* Background Image */}
            {isFilled.image(panel.backgroundImage) && (
                <div className={`absolute inset-0 rounded-lg overflow-hidden ${isActive ? 'brightness-90' : 'brightness-40'}`}>
                    <PrismicNextImage
                        field={panel.backgroundImage}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        alt=""
                    />
                    <div className="absolute inset-0 bg-black/20" />
                </div>
            )}

            {/* Panel Title (Vertical) */}
            <div className="absolute left-1/2 bottom-10 -translate-x-1/2 z-10">
                <div
                    className={`panel-title text-white font-playfair tracking-wide font-bold text-xl ${isActive ? 'opacity-0' : ''}`}
                    style={{
                        writingMode: 'vertical-rl',
                        textOrientation: 'mixed',
                        transform: 'rotate(180deg)'
                    }}
                >
                    {panel.title}
                </div>
            </div>

            {/* Panel Content (appears when active) */}
            <div className={`panel-content absolute bottom-8 left-8 right-8 z-10 text-white ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                <p className="text-2xl font-bold mb-4 font-playfair tracking-wide">{panel.title}</p>
                {isFilled.richText(panel.description) && (
                    <div className="text-lg leading-relaxed opacity-90 font-lato tracking-wide">
                        <PrismicRichText field={panel.description} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccordionItem; 