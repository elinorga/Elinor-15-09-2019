export interface City {
    Key: string;
    LocalizedName: string;
    WeatherText: string;
    WeatherIcon: number;
    Date: string;
    Country: Country;
    Temperature: Temperature;
    Day: Day;
}

interface Country {
    LocalizedName: string;
}

interface Temperature {
    Metric: Metric;
    Minimum: Minimum;
    Maximum: Maximum;
}

interface Metric {
    Value: number;
}

interface Minimum {
    Value: number;
}

interface Maximum {
    Value: number;
}

interface Day {
    Icon: number;
}