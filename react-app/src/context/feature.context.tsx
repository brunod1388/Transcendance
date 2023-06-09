import { PropsWithChildren, createContext, useContext, useState } from "react";

export enum Feature {
    None,
    Chat,
    Setting,
    Pong,
    Game,
    Private,
}

export interface FeatureContextType {
    feature: number;
    setFeature: (feature: number) => void;
}

const defaultContext: FeatureContextType = {
    feature: Feature.None,
    setFeature: (feature: number) => {},
};
const FeatureContext = createContext<FeatureContextType>(defaultContext);

export function FeatureProvider(props: PropsWithChildren) {
    const [feature, setFeature] = useState<number>(Feature.None);

    const providerValue: FeatureContextType = {
        feature: feature,
        setFeature: setFeature,
    };

    return (
        <FeatureContext.Provider value={providerValue}>{props.children}</FeatureContext.Provider>
    );
}

export function useFeature(): FeatureContextType {
    return useContext(FeatureContext);
}
