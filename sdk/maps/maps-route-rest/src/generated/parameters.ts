// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RequestParameters } from "@azure-rest/core-client";
import {
  RouteMatrixQuery,
  RouteDirectionParameters,
  BatchRequest,
} from "./models.js";

export interface RouteRequestRouteMatrixBodyParam {
  /** The matrix of origin and destination coordinates to compute the route distance, travel time and other summary for each cell of the matrix based on the input parameters. The minimum and the maximum cell count supported are 1 and **700** for async and **100** for sync respectively. For example, it can be 35 origins and 20 destinations or 25 origins and 25 destinations for async API. */
  body: RouteMatrixQuery;
}

export interface RouteRequestRouteMatrixQueryParamProperties {
  /** Boolean to indicate whether to execute the request synchronously. If set to true, user will get a 200 response if the request is finished under 120 seconds. Otherwise, user will get a 202 response right away. Please refer to the API description for more details on 202 response. **Supported only for async request**. */
  waitForResults?: boolean;
  /** Specifies whether to return additional travel times using different types of traffic information (none, historic, live) as well as the default best-estimate travel time. */
  computeTravelTimeFor?: "none" | "all";
  /** Specifies which of the section types is reported in the route response. <br><br>For example if sectionType = pedestrian the sections which are suited for pedestrians only are returned. Can be specified multiple times in one request, for example, '&sectionType=carTrain&sectionType=pedestrian&sectionType=motorway'. The default sectionType refers to the travelMode input. By default travelMode is set to car */
  sectionType?: Array<
    | "carTrain"
    | "country"
    | "ferry"
    | "motorway"
    | "pedestrian"
    | "tollRoad"
    | "tollVignette"
    | "traffic"
    | "travelMode"
    | "tunnel"
    | "carpool"
    | "urban"
  >;
  /**
   * The date and time of arrival at the destination point formatted as a `dateTime` value as defined in [RFC 3339, section 5.6](https://www.rfc-editor.org/rfc/rfc3339#section-5.6), with an optional time zone offset. When a time zone offset is not specified it will be assumed to be that of the destination point.
   *
   * Examples:
   *   * 2023-12-19T16:39:57
   *   * 2023-12-19T16:39:57-08:00
   *
   * The `arriveAt` parameter cannot be used in conjunction with `departAt`, `minDeviationDistance` or `minDeviationTime`.
   */
  arriveAt?: Date | string;
  /**
   * The date and time of departure from the origin point formatted as a `dateTime` value as defined in [RFC 3339, section 5.6](https://www.rfc-editor.org/rfc/rfc3339#section-5.6), with an optional time zone offset. When a time zone offset is not specified, it will be assumed to be that of the origin point.
   *   * Default value: now
   *   * Other value: `dateTime`
   *
   * Examples:
   *   * 2023-12-19T16:39:57
   *   * 2023-12-19T16:39:57-08:00
   *
   * The `departAt` parameter cannot be used in conjunction with `arriveAt`.
   */
  departAt?: Date | string;
  /** Weight per axle of the vehicle in kg. A value of 0 means that weight restrictions per axle are not considered. */
  vehicleAxleWeight?: number;
  /** Length of the vehicle in meters. A value of 0 means that length restrictions are not considered. */
  vehicleLength?: number;
  /** Height of the vehicle in meters. A value of 0 means that height restrictions are not considered. */
  vehicleHeight?: number;
  /** Width of the vehicle in meters. A value of 0 means that width restrictions are not considered. */
  vehicleWidth?: number;
  /**
   * Maximum speed of the vehicle in km/hour. The max speed in the vehicle profile is used to check whether a vehicle is allowed on motorways.
   *
   * * A value of 0 means that an appropriate value for the vehicle will be determined and applied during route planning.
   *
   * * A non-zero value may be overridden during route planning. For example, the current traffic flow is 60 km/hour. If the vehicle  maximum speed is set to 50 km/hour, the routing engine will consider 60 km/hour as this is the current situation.  If the maximum speed of the vehicle is provided as 80 km/hour but the current traffic flow is 60 km/hour, then routing engine will again use 60 km/hour.
   */
  vehicleMaxSpeed?: number;
  /** Weight of the vehicle in kilograms. */
  vehicleWeight?: number;
  /** Level of turns for thrilling route. This parameter can only be used in conjunction with `routeType`=thrilling. */
  windingness?: "low" | "normal" | "high";
  /** Degree of hilliness for thrilling route. This parameter can only be used in conjunction with `routeType`=thrilling. */
  hilliness?: "low" | "normal" | "high";
  /** The mode of travel for the requested route. If not defined, default is 'car'. Note that the requested travelMode may not be available for the entire route. Where the requested travelMode is not available for a particular section, the travelMode element of the response for that section will be "other". Note that travel modes bus, motorcycle, taxi and van are BETA functionality. Full restriction data is not available in all areas. */
  travelMode?:
    | "car"
    | "truck"
    | "taxi"
    | "bus"
    | "van"
    | "motorcycle"
    | "bicycle"
    | "pedestrian";
  /** Specifies something that the route calculation should try to avoid when determining the route. Can be specified multiple times in one request, for example, '&avoid=motorways&avoid=tollRoads&avoid=ferries'. In Route Range requests, the value alreadyUsedRoads must not be used. */
  avoid?: Array<
    | "tollRoads"
    | "motorways"
    | "ferries"
    | "unpavedRoads"
    | "carpools"
    | "alreadyUsedRoads"
    | "borderCrossings"
  >;
  /**
   * Possible values:
   *   * true - Do consider all available traffic information during routing
   *   * false - Ignore current traffic data during routing. Note that although the current traffic data is ignored
   *   during routing, the effect of historic traffic on effective road speeds is still incorporated.
   */
  traffic?: boolean;
  /** The type of route requested. */
  routeType?: "fastest" | "shortest" | "eco" | "thrilling";
  /** Types of cargo that may be classified as hazardous materials and restricted from some roads. Available vehicleLoadType values are US Hazmat classes 1 through 9, plus generic classifications for use in other countries/regions. Values beginning with USHazmat are for US routing while otherHazmat should be used for all other countries/regions. vehicleLoadType can be specified multiple times. This parameter is currently only considered for travelMode=truck. */
  vehicleLoadType?:
    | "USHazmatClass1"
    | "USHazmatClass2"
    | "USHazmatClass3"
    | "USHazmatClass4"
    | "USHazmatClass5"
    | "USHazmatClass6"
    | "USHazmatClass7"
    | "USHazmatClass8"
    | "USHazmatClass9"
    | "otherHazmatExplosive"
    | "otherHazmatGeneral"
    | "otherHazmatHarmfulToWater";
}

export interface RouteRequestRouteMatrixQueryParam {
  queryParameters?: RouteRequestRouteMatrixQueryParamProperties;
}

export interface RouteRequestRouteMatrixMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type RouteRequestRouteMatrixParameters =
  RouteRequestRouteMatrixQueryParam &
    RouteRequestRouteMatrixMediaTypesParam &
    RouteRequestRouteMatrixBodyParam &
    RequestParameters;
export type RouteGetRouteMatrixParameters = RequestParameters;

export interface RouteRequestRouteMatrixSyncBodyParam {
  /** The matrix of origin and destination coordinates to compute the route distance, travel time and other summary for each cell of the matrix based on the input parameters. The minimum and the maximum cell count supported are 1 and **700** for async and **100** for sync respectively. For example, it can be 35 origins and 20 destinations or 25 origins and 25 destinations for async API. */
  body: RouteMatrixQuery;
}

export interface RouteRequestRouteMatrixSyncQueryParamProperties {
  /** Boolean to indicate whether to execute the request synchronously. If set to true, user will get a 200 response if the request is finished under 120 seconds. Otherwise, user will get a 202 response right away. Please refer to the API description for more details on 202 response. **Supported only for async request**. */
  waitForResults?: boolean;
  /** Specifies whether to return additional travel times using different types of traffic information (none, historic, live) as well as the default best-estimate travel time. */
  computeTravelTimeFor?: "none" | "all";
  /** Specifies which of the section types is reported in the route response. <br><br>For example if sectionType = pedestrian the sections which are suited for pedestrians only are returned. Can be specified multiple times in one request, for example, '&sectionType=carTrain&sectionType=pedestrian&sectionType=motorway'. The default sectionType refers to the travelMode input. By default travelMode is set to car */
  sectionType?: Array<
    | "carTrain"
    | "country"
    | "ferry"
    | "motorway"
    | "pedestrian"
    | "tollRoad"
    | "tollVignette"
    | "traffic"
    | "travelMode"
    | "tunnel"
    | "carpool"
    | "urban"
  >;
  /**
   * The date and time of arrival at the destination point formatted as a `dateTime` value as defined in [RFC 3339, section 5.6](https://www.rfc-editor.org/rfc/rfc3339#section-5.6), with an optional time zone offset. When a time zone offset is not specified it will be assumed to be that of the destination point.
   *
   * Examples:
   *   * 2023-12-19T16:39:57
   *   * 2023-12-19T16:39:57-08:00
   *
   * The `arriveAt` parameter cannot be used in conjunction with `departAt`, `minDeviationDistance` or `minDeviationTime`.
   */
  arriveAt?: Date | string;
  /**
   * The date and time of departure from the origin point formatted as a `dateTime` value as defined in [RFC 3339, section 5.6](https://www.rfc-editor.org/rfc/rfc3339#section-5.6), with an optional time zone offset. When a time zone offset is not specified, it will be assumed to be that of the origin point.
   *   * Default value: now
   *   * Other value: `dateTime`
   *
   * Examples:
   *   * 2023-12-19T16:39:57
   *   * 2023-12-19T16:39:57-08:00
   *
   * The `departAt` parameter cannot be used in conjunction with `arriveAt`.
   */
  departAt?: Date | string;
  /** Weight per axle of the vehicle in kg. A value of 0 means that weight restrictions per axle are not considered. */
  vehicleAxleWeight?: number;
  /** Length of the vehicle in meters. A value of 0 means that length restrictions are not considered. */
  vehicleLength?: number;
  /** Height of the vehicle in meters. A value of 0 means that height restrictions are not considered. */
  vehicleHeight?: number;
  /** Width of the vehicle in meters. A value of 0 means that width restrictions are not considered. */
  vehicleWidth?: number;
  /**
   * Maximum speed of the vehicle in km/hour. The max speed in the vehicle profile is used to check whether a vehicle is allowed on motorways.
   *
   * * A value of 0 means that an appropriate value for the vehicle will be determined and applied during route planning.
   *
   * * A non-zero value may be overridden during route planning. For example, the current traffic flow is 60 km/hour. If the vehicle  maximum speed is set to 50 km/hour, the routing engine will consider 60 km/hour as this is the current situation.  If the maximum speed of the vehicle is provided as 80 km/hour but the current traffic flow is 60 km/hour, then routing engine will again use 60 km/hour.
   */
  vehicleMaxSpeed?: number;
  /** Weight of the vehicle in kilograms. */
  vehicleWeight?: number;
  /** Level of turns for thrilling route. This parameter can only be used in conjunction with `routeType`=thrilling. */
  windingness?: "low" | "normal" | "high";
  /** Degree of hilliness for thrilling route. This parameter can only be used in conjunction with `routeType`=thrilling. */
  hilliness?: "low" | "normal" | "high";
  /** The mode of travel for the requested route. If not defined, default is 'car'. Note that the requested travelMode may not be available for the entire route. Where the requested travelMode is not available for a particular section, the travelMode element of the response for that section will be "other". Note that travel modes bus, motorcycle, taxi and van are BETA functionality. Full restriction data is not available in all areas. */
  travelMode?:
    | "car"
    | "truck"
    | "taxi"
    | "bus"
    | "van"
    | "motorcycle"
    | "bicycle"
    | "pedestrian";
  /** Specifies something that the route calculation should try to avoid when determining the route. Can be specified multiple times in one request, for example, '&avoid=motorways&avoid=tollRoads&avoid=ferries'. In Route Range requests, the value alreadyUsedRoads must not be used. */
  avoid?: Array<
    | "tollRoads"
    | "motorways"
    | "ferries"
    | "unpavedRoads"
    | "carpools"
    | "alreadyUsedRoads"
    | "borderCrossings"
  >;
  /**
   * Possible values:
   *   * true - Do consider all available traffic information during routing
   *   * false - Ignore current traffic data during routing. Note that although the current traffic data is ignored
   *   during routing, the effect of historic traffic on effective road speeds is still incorporated.
   */
  traffic?: boolean;
  /** The type of route requested. */
  routeType?: "fastest" | "shortest" | "eco" | "thrilling";
  /** Types of cargo that may be classified as hazardous materials and restricted from some roads. Available vehicleLoadType values are US Hazmat classes 1 through 9, plus generic classifications for use in other countries/regions. Values beginning with USHazmat are for US routing while otherHazmat should be used for all other countries/regions. vehicleLoadType can be specified multiple times. This parameter is currently only considered for travelMode=truck. */
  vehicleLoadType?:
    | "USHazmatClass1"
    | "USHazmatClass2"
    | "USHazmatClass3"
    | "USHazmatClass4"
    | "USHazmatClass5"
    | "USHazmatClass6"
    | "USHazmatClass7"
    | "USHazmatClass8"
    | "USHazmatClass9"
    | "otherHazmatExplosive"
    | "otherHazmatGeneral"
    | "otherHazmatHarmfulToWater";
}

export interface RouteRequestRouteMatrixSyncQueryParam {
  queryParameters?: RouteRequestRouteMatrixSyncQueryParamProperties;
}

export interface RouteRequestRouteMatrixSyncMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type RouteRequestRouteMatrixSyncParameters =
  RouteRequestRouteMatrixSyncQueryParam &
    RouteRequestRouteMatrixSyncMediaTypesParam &
    RouteRequestRouteMatrixSyncBodyParam &
    RequestParameters;

export interface RouteGetRouteDirectionsQueryParamProperties {
  /** The Coordinates through which the route is calculated, delimited by a colon.  A minimum of two coordinates is required.  The first one is the origin and the last is the destination of the route. Optional coordinates in-between act as WayPoints in the route.  You can pass up to 150 WayPoints. */
  query: string;
  /** Number of desired alternative routes to be calculated. Default: 0, minimum: 0 and maximum: 5 */
  maxAlternatives?: number;
  /** Controls the optimality, with respect to the given planning criteria, of the calculated alternatives compared to the reference route. */
  alternativeType?: "anyRoute" | "betterRoute";
  /** All alternative routes returned will follow the reference route (see section POST Requests) from the origin point of the calculateRoute request for at least this number of meters. Can only be used when reconstructing a route. The minDeviationDistance parameter cannot be used in conjunction with arriveAt */
  minDeviationDistance?: number;
  /**
   * The date and time of arrival at the destination point formatted as a `dateTime` value as defined in [RFC 3339, section 5.6](https://www.rfc-editor.org/rfc/rfc3339#section-5.6), with an optional time zone offset. When a time zone offset is not specified it will be assumed to be that of the destination point.
   *
   * Examples:
   *   * 2023-12-19T16:39:57
   *   * 2023-12-19T16:39:57-08:00
   *
   * The `arriveAt` parameter cannot be used in conjunction with `departAt`, `minDeviationDistance` or `minDeviationTime`.
   */
  arriveAt?: Date | string;
  /**
   * The date and time of departure from the origin point formatted as a `dateTime` value as defined in [RFC 3339, section 5.6](https://www.rfc-editor.org/rfc/rfc3339#section-5.6), with an optional time zone offset. When a time zone offset is not specified, it will be assumed to be that of the origin point.
   *   * Default value: now
   *   * Other value: `dateTime`
   *
   * Examples:
   *   * 2023-12-19T16:39:57
   *   * 2023-12-19T16:39:57-08:00
   *
   * The `departAt` parameter cannot be used in conjunction with `arriveAt`.
   */
  departAt?: Date | string;
  /**
   * All alternative routes returned will follow the reference route (see section POST Requests) from the origin point of the calculateRoute request for at least this number of seconds. Can only be used when reconstructing a route. The minDeviationTime parameter cannot be used in conjunction with arriveAt. Default value is 0. Setting )minDeviationTime_ to a value greater than zero has the following consequences:
   *   - The origin point of the _calculateRoute_ Request must be on
   *     (or very near) the input reference route.
   *     - If this is not the case, an error is returned.
   *     - However, the origin point does not need to be at the beginning
   *       of the input reference route (it can be thought of as the current
   *       vehicle position on the reference route).
   *   - The reference route, returned as the first route in the _calculateRoute_
   *     Response, will start at the origin point specified in the _calculateRoute_
   *     Request. The initial part of the input reference route up until the origin
   *     point will be excluded from the Response.
   *   - The values of _minDeviationDistance_ and _minDeviationTime_ determine
   *     how far alternative routes will be guaranteed to follow the reference
   *     route from the origin point onwards.
   *   - The route must use _departAt_.
   *   - The _vehicleHeading_ is ignored.
   */
  minDeviationTime?: number;
  /** If specified, guidance instructions will be returned. Note that the instructionsType parameter cannot be used in conjunction with routeRepresentation=none. */
  instructionsType?: "coded" | "text" | "tagged";
  /**
   * The language parameter determines the language of the guidance messages. Proper nouns (the names of streets, plazas, etc.) are returned in the specified  language, or if that is not available, they are returned in an available language  that is close to it. Allowed values are (a subset of) the IETF language tags. The currently supported  languages are listed in the [Supported languages  section](https://docs.microsoft.com/azure/azure-maps/supported-languages).
   *
   * Default value: en-GB
   */
  language?: string;
  /** Re-order the route waypoints using a fast heuristic algorithm to reduce the route length. Yields best results when used in conjunction with routeType _shortest_. Notice that origin and destination are excluded from the optimized waypoint indices. To include origin and destination in the response, please increase all the indices by 1 to account for the origin, and then add the destination as the final index. Possible values are true or false. True computes a better order if possible, but is not allowed to be used in conjunction with maxAlternatives value greater than 0 or in conjunction with circle waypoints. False will use the locations in the given order and not allowed to be used in conjunction with routeRepresentation _none_. */
  computeBestOrder?: boolean;
  /** Specifies the representation of the set of routes provided as response. */
  routeRepresentation?: "polyline" | "summaryOnly" | "none";
  /** Specifies whether to return additional travel times using different types of traffic information (none, historic, live) as well as the default best-estimate travel time. */
  computeTravelTimeFor?: "none" | "all";
  /** The directional heading of the vehicle in degrees starting at true North and continuing in clockwise direction. North is 0 degrees, east is 90 degrees, south is 180 degrees, west is 270 degrees. Possible values 0-359 */
  vehicleHeading?: number;
  /** Specifies which data should be reported for diagnosis purposes. The only possible value is _effectiveSettings_. Reports the effective parameters or data used when calling the API. In the case of defaulted parameters the default will be reflected where the parameter was not specified by the caller. */
  report?: "effectiveSettings";
  /** Specifies which of the section types is reported in the route response. <br><br>For example if sectionType = pedestrian the sections which are suited for pedestrians only are returned. Can be specified multiple times in one request, for example, '&sectionType=carTrain&sectionType=pedestrian&sectionType=motorway'. The default sectionType refers to the travelMode input. By default travelMode is set to car */
  sectionType?: Array<
    | "carTrain"
    | "country"
    | "ferry"
    | "motorway"
    | "pedestrian"
    | "tollRoad"
    | "tollVignette"
    | "traffic"
    | "travelMode"
    | "tunnel"
    | "carpool"
    | "urban"
  >;
  /** Weight per axle of the vehicle in kg. A value of 0 means that weight restrictions per axle are not considered. */
  vehicleAxleWeight?: number;
  /** Width of the vehicle in meters. A value of 0 means that width restrictions are not considered. */
  vehicleWidth?: number;
  /** Height of the vehicle in meters. A value of 0 means that height restrictions are not considered. */
  vehicleHeight?: number;
  /** Length of the vehicle in meters. A value of 0 means that length restrictions are not considered. */
  vehicleLength?: number;
  /**
   * Maximum speed of the vehicle in km/hour. The max speed in the vehicle profile is used to check whether a vehicle is allowed on motorways.
   *
   * * A value of 0 means that an appropriate value for the vehicle will be determined and applied during route planning.
   *
   * * A non-zero value may be overridden during route planning. For example, the current traffic flow is 60 km/hour. If the vehicle  maximum speed is set to 50 km/hour, the routing engine will consider 60 km/hour as this is the current situation.  If the maximum speed of the vehicle is provided as 80 km/hour but the current traffic flow is 60 km/hour, then routing engine will again use 60 km/hour.
   */
  vehicleMaxSpeed?: number;
  /**
   * Weight of the vehicle in kilograms.
   *
   * * It is mandatory if any of the *Efficiency parameters are set.
   *
   * * It must be strictly positive when used in the context of the Consumption Model. Weight restrictions are considered.
   *
   * * If no detailed **Consumption Model** is specified and the value of **vehicleWeight** is non-zero, then weight restrictions are considered.
   *
   * * In all other cases, this parameter is ignored.
   *
   * Sensible Values : for **Combustion Model** : 1600, for **Electric Model** : 1900
   */
  vehicleWeight?: number;
  /** Whether the vehicle is used for commercial purposes. Commercial vehicles may not be allowed to drive on some roads. */
  vehicleCommercial?: boolean;
  /** Level of turns for thrilling route. This parameter can only be used in conjunction with `routeType`=thrilling. */
  windingness?: "low" | "normal" | "high";
  /** Degree of hilliness for thrilling route. This parameter can only be used in conjunction with `routeType`=thrilling. */
  hilliness?: "low" | "normal" | "high";
  /** The mode of travel for the requested route. If not defined, default is 'car'. Note that the requested travelMode may not be available for the entire route. Where the requested travelMode is not available for a particular section, the travelMode element of the response for that section will be "other". Note that travel modes bus, motorcycle, taxi and van are BETA functionality. Full restriction data is not available in all areas. */
  travelMode?:
    | "car"
    | "truck"
    | "taxi"
    | "bus"
    | "van"
    | "motorcycle"
    | "bicycle"
    | "pedestrian";
  /** Specifies something that the route calculation should try to avoid when determining the route. Can be specified multiple times in one request, for example, '&avoid=motorways&avoid=tollRoads&avoid=ferries'. In Route Range requests, the value alreadyUsedRoads must not be used. */
  avoid?: Array<
    | "tollRoads"
    | "motorways"
    | "ferries"
    | "unpavedRoads"
    | "carpools"
    | "alreadyUsedRoads"
    | "borderCrossings"
  >;
  /**
   * Possible values:
   *   * true - Do consider all available traffic information during routing
   *   * false - Ignore current traffic data during routing. Note that although the current traffic data is ignored
   *   during routing, the effect of historic traffic on effective road speeds is still incorporated.
   */
  traffic?: boolean;
  /** The type of route requested. */
  routeType?: "fastest" | "shortest" | "eco" | "thrilling";
  /** Types of cargo that may be classified as hazardous materials and restricted from some roads. Available vehicleLoadType values are US Hazmat classes 1 through 9, plus generic classifications for use in other countries/regions. Values beginning with USHazmat are for US routing while otherHazmat should be used for all other countries/regions. vehicleLoadType can be specified multiple times. This parameter is currently only considered for travelMode=truck. */
  vehicleLoadType?:
    | "USHazmatClass1"
    | "USHazmatClass2"
    | "USHazmatClass3"
    | "USHazmatClass4"
    | "USHazmatClass5"
    | "USHazmatClass6"
    | "USHazmatClass7"
    | "USHazmatClass8"
    | "USHazmatClass9"
    | "otherHazmatExplosive"
    | "otherHazmatGeneral"
    | "otherHazmatHarmfulToWater";
  /** Engine type of the vehicle. When a detailed Consumption Model is specified, it must be consistent with the value of **vehicleEngineType**. */
  vehicleEngineType?: "combustion" | "electric";
  /**
   *
   * Specifies the speed-dependent component of consumption.
   *
   * Provided as an unordered list of colon-delimited speed & consumption-rate pairs. The list defines points on a consumption curve. Consumption rates for speeds not in the list are found as follows:
   *
   *  * by linear interpolation, if the given speed lies in between two speeds in the list
   *
   *  * by linear extrapolation otherwise, assuming a constant (ΔConsumption/ΔSpeed) determined by the nearest two points in the list
   *
   * The list must contain between 1 and 25 points (inclusive), and may not contain duplicate points for the same speed. If it only contains a single point, then the consumption rate of that point is used without further processing.
   *
   * Consumption specified for the largest speed must be greater than or equal to that of the penultimate largest speed. This ensures that extrapolation does not lead to negative consumption rates.
   *
   * Similarly, consumption values specified for the two smallest speeds in the list cannot lead to a negative consumption rate for any smaller speed.
   *
   * The valid range for the consumption values(expressed in l/100km) is between 0.01 and 100000.0.
   *
   * Sensible Values : 50,6.3:130,11.5
   *
   * **Note** : This parameter is required for **The Combustion Consumption Model**.
   */
  constantSpeedConsumptionInLitersPerHundredkm?: string;
  /**
   * Specifies the current supply of fuel in liters.
   *
   * Sensible Values : 55
   */
  currentFuelInLiters?: number;
  /**
   * Specifies the amount of fuel consumed for sustaining auxiliary systems of the vehicle, in liters per hour.
   *
   * It can be used to specify consumption due to devices and systems such as AC systems, radio, heating, etc.
   *
   * Sensible Values : 0.2
   */
  auxiliaryPowerInLitersPerHour?: number;
  /**
   * Specifies the amount of chemical energy stored in one liter of fuel in megajoules (MJ). It is used in conjunction with the ***Efficiency** parameters for conversions between saved or consumed energy and fuel. For example, energy density is 34.2 MJ/l for gasoline, and 35.8 MJ/l for Diesel fuel.
   *
   * This parameter is required if any ***Efficiency** parameter is set.
   *
   * Sensible Values : 34.2
   */
  fuelEnergyDensityInMJoulesPerLiter?: number;
  /**
   * Specifies the efficiency of converting chemical energy stored in fuel to kinetic energy when the vehicle accelerates _(i.e. KineticEnergyGained/ChemicalEnergyConsumed). ChemicalEnergyConsumed_ is obtained by converting consumed fuel to chemical energy using **fuelEnergyDensityInMJoulesPerLiter**.
   *
   * Must be paired with **decelerationEfficiency**.
   *
   * The range of values allowed are 0.0 to 1/**decelerationEfficiency**.
   *
   * Sensible Values : for **Combustion Model** : 0.33, for **Electric Model** : 0.66
   */
  accelerationEfficiency?: number;
  /**
   * Specifies the efficiency of converting kinetic energy to saved (not consumed) fuel when the vehicle decelerates _(i.e. ChemicalEnergySaved/KineticEnergyLost). ChemicalEnergySaved_ is obtained by converting saved (not consumed) fuel to energy using **fuelEnergyDensityInMJoulesPerLiter**.
   *
   * Must be paired with **accelerationEfficiency**.
   *
   * The range of values allowed are 0.0 to 1/**accelerationEfficiency**.
   *
   * Sensible Values : for **Combustion Model** : 0.83, for **Electric Model** : 0.91
   */
  decelerationEfficiency?: number;
  /**
   * Specifies the efficiency of converting chemical energy stored in fuel to potential energy when the vehicle gains elevation _(i.e. PotentialEnergyGained/ChemicalEnergyConsumed). ChemicalEnergyConsumed_ is obtained by converting consumed fuel to chemical energy using **fuelEnergyDensityInMJoulesPerLiter**.
   *
   * Must be paired with **downhillEfficiency**.
   *
   * The range of values allowed are 0.0 to 1/**downhillEfficiency**.
   *
   * Sensible Values : for **Combustion Model** : 0.27, for **Electric Model** : 0.74
   */
  uphillEfficiency?: number;
  /**
   * Specifies the efficiency of converting potential energy to saved (not consumed) fuel when the vehicle loses elevation _(i.e. ChemicalEnergySaved/PotentialEnergyLost). ChemicalEnergySaved_ is obtained by converting saved (not consumed) fuel to energy using **fuelEnergyDensityInMJoulesPerLiter**.
   *
   * Must be paired with **uphillEfficiency**.
   *
   * The range of values allowed are 0.0 to 1/**uphillEfficiency**.
   *
   * Sensible Values : for **Combustion Model** : 0.51, for **Electric Model** : 0.73
   */
  downhillEfficiency?: number;
  /**
   * Specifies the speed-dependent component of consumption.
   *
   * Provided as an unordered list of speed/consumption-rate pairs. The list defines points on a consumption curve. Consumption rates for speeds not in the list are found as follows:
   *
   * * by linear interpolation, if the given speed lies in between two speeds in the list
   *
   * * by linear extrapolation otherwise, assuming a constant (ΔConsumption/ΔSpeed) determined by the nearest two points in the list
   *
   * The list must contain between 1 and 25 points (inclusive), and may not contain duplicate points for the same speed. If it only contains a single point, then the consumption rate of that point is used without further processing.
   *
   * Consumption specified for the largest speed must be greater than or equal to that of the penultimate largest speed. This ensures that extrapolation does not lead to negative consumption rates.
   *
   * Similarly, consumption values specified for the two smallest speeds in the list cannot lead to a negative consumption rate for any smaller  speed.
   *
   * The valid range for the consumption values(expressed in kWh/100km) is between 0.01 and 100000.0.
   *
   * Sensible Values : 50,8.2:130,21.3
   *
   * This parameter is required for **Electric consumption model**.
   */
  constantSpeedConsumptionInkWhPerHundredkm?: string;
  /**
   * Specifies the current electric energy supply in kilowatt hours (kWh).
   *
   * This parameter co-exists with **maxChargeInkWh** parameter.
   *
   * The range of values allowed are 0.0 to **maxChargeInkWh**.
   *
   * Sensible Values : 43
   */
  currentChargeInkWh?: number;
  /**
   * Specifies the maximum electric energy supply in kilowatt hours (kWh) that may be stored in the vehicle's battery.
   *
   * This parameter co-exists with **currentChargeInkWh** parameter.
   *
   * Minimum value has to be greater than or equal to **currentChargeInkWh**.
   *
   * Sensible Values : 85
   */
  maxChargeInkWh?: number;
  /**
   * Specifies the amount of power consumed for sustaining auxiliary systems, in kilowatts (kW).
   *
   * It can be used to specify consumption due to devices and systems such as AC systems, radio, heating, etc.
   *
   * Sensible Values : 1.7
   */
  auxiliaryPowerInkW?: number;
}

export interface RouteGetRouteDirectionsQueryParam {
  queryParameters: RouteGetRouteDirectionsQueryParamProperties;
}

export type RouteGetRouteDirectionsParameters =
  RouteGetRouteDirectionsQueryParam & RequestParameters;

export interface RouteGetRouteDirectionsWithAdditionalParametersBodyParam {
  /**
   * Used for reconstructing a route and for calculating zero or more alternative routes to this reference route.  The provided sequence of coordinates is used as input for route reconstruction. The alternative routes  are calculated between the origin and destination points specified in the base path parameter locations.  If both minDeviationDistance and minDeviationTime are set to zero, then these origin and destination points  are expected to be at (or very near) the beginning and end of the reference route, respectively. Intermediate  locations (waypoints) are not supported when using supportingPoints.
   *
   * Setting at least one of minDeviationDistance or minDeviationTime to a value greater than zero has the  following consequences:
   *
   * *  The origin point of the calculateRoute request must be on (or very near) the input reference route. If  this is not the case, an error is returned. However, the origin point does not need to be at the beginning of  the input reference route (it can be thought of as the current vehicle position on the reference route).
   * *  The reference route, returned as the first route in the calculateRoute response, will start at the origin  point specified in the calculateRoute request. The initial part of the input reference route up until the  origin point will be excluded from the response.
   * *  The values of minDeviationDistance and minDeviationTime determine how far alternative routes will be  guaranteed to follow the reference route from the origin point onwards.
   * *  The route must use departAt.
   * *  The vehicleHeading is ignored.
   */
  body: RouteDirectionParameters;
}

export interface RouteGetRouteDirectionsWithAdditionalParametersQueryParamProperties {
  /** The Coordinates through which the route is calculated, delimited by a colon.  A minimum of two coordinates is required.  The first one is the origin and the last is the destination of the route. Optional coordinates in-between act as WayPoints in the route.  You can pass up to 150 WayPoints. */
  query: string;
  /** Number of desired alternative routes to be calculated. Default: 0, minimum: 0 and maximum: 5 */
  maxAlternatives?: number;
  /** Controls the optimality, with respect to the given planning criteria, of the calculated alternatives compared to the reference route. */
  alternativeType?: "anyRoute" | "betterRoute";
  /** All alternative routes returned will follow the reference route (see section POST Requests) from the origin point of the calculateRoute request for at least this number of meters. Can only be used when reconstructing a route. The minDeviationDistance parameter cannot be used in conjunction with arriveAt */
  minDeviationDistance?: number;
  /**
   * All alternative routes returned will follow the reference route (see section POST Requests) from the origin point of the calculateRoute request for at least this number of seconds. Can only be used when reconstructing a route. The minDeviationTime parameter cannot be used in conjunction with arriveAt. Default value is 0. Setting )minDeviationTime_ to a value greater than zero has the following consequences:
   *   - The origin point of the _calculateRoute_ Request must be on
   *     (or very near) the input reference route.
   *     - If this is not the case, an error is returned.
   *     - However, the origin point does not need to be at the beginning
   *       of the input reference route (it can be thought of as the current
   *       vehicle position on the reference route).
   *   - The reference route, returned as the first route in the _calculateRoute_
   *     Response, will start at the origin point specified in the _calculateRoute_
   *     Request. The initial part of the input reference route up until the origin
   *     point will be excluded from the Response.
   *   - The values of _minDeviationDistance_ and _minDeviationTime_ determine
   *     how far alternative routes will be guaranteed to follow the reference
   *     route from the origin point onwards.
   *   - The route must use _departAt_.
   *   - The _vehicleHeading_ is ignored.
   */
  minDeviationTime?: number;
  /** If specified, guidance instructions will be returned. Note that the instructionsType parameter cannot be used in conjunction with routeRepresentation=none. */
  instructionsType?: "coded" | "text" | "tagged";
  /** The language parameter determines the language of the guidance messages. It does not affect proper nouns (the names of streets, plazas, etc.) It has no effect when instructionsType=coded. Allowed values are (a subset of) the IETF language tags described */
  language?: string;
  /** Re-order the route waypoints using a fast heuristic algorithm to reduce the route length. Yields best results when used in conjunction with routeType _shortest_. Notice that origin and destination are excluded from the optimized waypoint indices. To include origin and destination in the response, please increase all the indices by 1 to account for the origin, and then add the destination as the final index. Possible values are true or false. True computes a better order if possible, but is not allowed to be used in conjunction with maxAlternatives value greater than 0 or in conjunction with circle waypoints. False will use the locations in the given order and not allowed to be used in conjunction with routeRepresentation _none_. */
  computeBestOrder?: boolean;
  /** Specifies the representation of the set of routes provided as response. */
  routeRepresentation?: "polyline" | "summaryOnly" | "none";
  /** Specifies whether to return additional travel times using different types of traffic information (none, historic, live) as well as the default best-estimate travel time. */
  computeTravelTimeFor?: "none" | "all";
  /** The directional heading of the vehicle in degrees starting at true North and continuing in clockwise direction. North is 0 degrees, east is 90 degrees, south is 180 degrees, west is 270 degrees. Possible values 0-359 */
  vehicleHeading?: number;
  /** Specifies which data should be reported for diagnosis purposes. The only possible value is _effectiveSettings_. Reports the effective parameters or data used when calling the API. In the case of defaulted parameters the default will be reflected where the parameter was not specified by the caller. */
  report?: "effectiveSettings";
  /** Specifies which of the section types is reported in the route response. <br><br>For example if sectionType = pedestrian the sections which are suited for pedestrians only are returned. Can be specified multiple times in one request, for example, '&sectionType=carTrain&sectionType=pedestrian&sectionType=motorway'. The default sectionType refers to the travelMode input. By default travelMode is set to car */
  sectionType?: Array<
    | "carTrain"
    | "country"
    | "ferry"
    | "motorway"
    | "pedestrian"
    | "tollRoad"
    | "tollVignette"
    | "traffic"
    | "travelMode"
    | "tunnel"
    | "carpool"
    | "urban"
  >;
  /**
   * The date and time of arrival at the destination point formatted as a `dateTime` value as defined in [RFC 3339, section 5.6](https://www.rfc-editor.org/rfc/rfc3339#section-5.6), with an optional time zone offset. When a time zone offset is not specified it will be assumed to be that of the destination point.
   *
   * Examples:
   *   * 2023-12-19T16:39:57
   *   * 2023-12-19T16:39:57-08:00
   *
   * The `arriveAt` parameter cannot be used in conjunction with `departAt`, `minDeviationDistance` or `minDeviationTime`.
   */
  arriveAt?: Date | string;
  /**
   * The date and time of departure from the origin point formatted as a `dateTime` value as defined in [RFC 3339, section 5.6](https://www.rfc-editor.org/rfc/rfc3339#section-5.6), with an optional time zone offset. When a time zone offset is not specified, it will be assumed to be that of the origin point.
   *   * Default value: now
   *   * Other value: `dateTime`
   *
   * Examples:
   *   * 2023-12-19T16:39:57
   *   * 2023-12-19T16:39:57-08:00
   *
   * The `departAt` parameter cannot be used in conjunction with `arriveAt`.
   */
  departAt?: Date | string;
  /** Weight per axle of the vehicle in kg. A value of 0 means that weight restrictions per axle are not considered. */
  vehicleAxleWeight?: number;
  /** Length of the vehicle in meters. A value of 0 means that length restrictions are not considered. */
  vehicleLength?: number;
  /** Height of the vehicle in meters. A value of 0 means that height restrictions are not considered. */
  vehicleHeight?: number;
  /** Width of the vehicle in meters. A value of 0 means that width restrictions are not considered. */
  vehicleWidth?: number;
  /**
   * Maximum speed of the vehicle in km/hour. The max speed in the vehicle profile is used to check whether a vehicle is allowed on motorways.
   *
   * * A value of 0 means that an appropriate value for the vehicle will be determined and applied during route planning.
   *
   * * A non-zero value may be overridden during route planning. For example, the current traffic flow is 60 km/hour. If the vehicle  maximum speed is set to 50 km/hour, the routing engine will consider 60 km/hour as this is the current situation.  If the maximum speed of the vehicle is provided as 80 km/hour but the current traffic flow is 60 km/hour, then routing engine will again use 60 km/hour.
   */
  vehicleMaxSpeed?: number;
  /**
   * Weight of the vehicle in kilograms.
   *
   * * It is mandatory if any of the *Efficiency parameters are set.
   *
   * * It must be strictly positive when used in the context of the Consumption Model. Weight restrictions are considered.
   *
   * * If no detailed **Consumption Model** is specified and the value of **vehicleWeight** is non-zero, then weight restrictions are considered.
   *
   * * In all other cases, this parameter is ignored.
   *
   * Sensible Values : for **Combustion Model** : 1600, for **Electric Model** : 1900
   */
  vehicleWeight?: number;
  /** Whether the vehicle is used for commercial purposes. Commercial vehicles may not be allowed to drive on some roads. */
  vehicleCommercial?: boolean;
  /** Level of turns for thrilling route. This parameter can only be used in conjunction with `routeType`=thrilling. */
  windingness?: "low" | "normal" | "high";
  /** Degree of hilliness for thrilling route. This parameter can only be used in conjunction with `routeType`=thrilling. */
  hilliness?: "low" | "normal" | "high";
  /** The mode of travel for the requested route. If not defined, default is 'car'. Note that the requested travelMode may not be available for the entire route. Where the requested travelMode is not available for a particular section, the travelMode element of the response for that section will be "other". Note that travel modes bus, motorcycle, taxi and van are BETA functionality. Full restriction data is not available in all areas. */
  travelMode?:
    | "car"
    | "truck"
    | "taxi"
    | "bus"
    | "van"
    | "motorcycle"
    | "bicycle"
    | "pedestrian";
  /** Specifies something that the route calculation should try to avoid when determining the route. Can be specified multiple times in one request, for example, '&avoid=motorways&avoid=tollRoads&avoid=ferries'. In Route Range requests, the value alreadyUsedRoads must not be used. */
  avoid?: Array<
    | "tollRoads"
    | "motorways"
    | "ferries"
    | "unpavedRoads"
    | "carpools"
    | "alreadyUsedRoads"
    | "borderCrossings"
  >;
  /**
   * Possible values:
   *   * true - Do consider all available traffic information during routing
   *   * false - Ignore current traffic data during routing. Note that although the current traffic data is ignored
   *   during routing, the effect of historic traffic on effective road speeds is still incorporated.
   */
  traffic?: boolean;
  /** The type of route requested. */
  routeType?: "fastest" | "shortest" | "eco" | "thrilling";
  /** Types of cargo that may be classified as hazardous materials and restricted from some roads. Available vehicleLoadType values are US Hazmat classes 1 through 9, plus generic classifications for use in other countries/regions. Values beginning with USHazmat are for US routing while otherHazmat should be used for all other countries/regions. vehicleLoadType can be specified multiple times. This parameter is currently only considered for travelMode=truck. */
  vehicleLoadType?:
    | "USHazmatClass1"
    | "USHazmatClass2"
    | "USHazmatClass3"
    | "USHazmatClass4"
    | "USHazmatClass5"
    | "USHazmatClass6"
    | "USHazmatClass7"
    | "USHazmatClass8"
    | "USHazmatClass9"
    | "otherHazmatExplosive"
    | "otherHazmatGeneral"
    | "otherHazmatHarmfulToWater";
  /** Engine type of the vehicle. When a detailed Consumption Model is specified, it must be consistent with the value of **vehicleEngineType**. */
  vehicleEngineType?: "combustion" | "electric";
  /**
   *
   * Specifies the speed-dependent component of consumption.
   *
   * Provided as an unordered list of colon-delimited speed & consumption-rate pairs. The list defines points on a consumption curve. Consumption rates for speeds not in the list are found as follows:
   *
   *  * by linear interpolation, if the given speed lies in between two speeds in the list
   *
   *  * by linear extrapolation otherwise, assuming a constant (ΔConsumption/ΔSpeed) determined by the nearest two points in the list
   *
   * The list must contain between 1 and 25 points (inclusive), and may not contain duplicate points for the same speed. If it only contains a single point, then the consumption rate of that point is used without further processing.
   *
   * Consumption specified for the largest speed must be greater than or equal to that of the penultimate largest speed. This ensures that extrapolation does not lead to negative consumption rates.
   *
   * Similarly, consumption values specified for the two smallest speeds in the list cannot lead to a negative consumption rate for any smaller speed.
   *
   * The valid range for the consumption values(expressed in l/100km) is between 0.01 and 100000.0.
   *
   * Sensible Values : 50,6.3:130,11.5
   *
   * **Note** : This parameter is required for **The Combustion Consumption Model**.
   */
  constantSpeedConsumptionInLitersPerHundredkm?: string;
  /**
   * Specifies the current supply of fuel in liters.
   *
   * Sensible Values : 55
   */
  currentFuelInLiters?: number;
  /**
   * Specifies the amount of fuel consumed for sustaining auxiliary systems of the vehicle, in liters per hour.
   *
   * It can be used to specify consumption due to devices and systems such as AC systems, radio, heating, etc.
   *
   * Sensible Values : 0.2
   */
  auxiliaryPowerInLitersPerHour?: number;
  /**
   * Specifies the amount of chemical energy stored in one liter of fuel in megajoules (MJ). It is used in conjunction with the ***Efficiency** parameters for conversions between saved or consumed energy and fuel. For example, energy density is 34.2 MJ/l for gasoline, and 35.8 MJ/l for Diesel fuel.
   *
   * This parameter is required if any ***Efficiency** parameter is set.
   *
   * Sensible Values : 34.2
   */
  fuelEnergyDensityInMJoulesPerLiter?: number;
  /**
   * Specifies the efficiency of converting chemical energy stored in fuel to kinetic energy when the vehicle accelerates _(i.e. KineticEnergyGained/ChemicalEnergyConsumed). ChemicalEnergyConsumed_ is obtained by converting consumed fuel to chemical energy using **fuelEnergyDensityInMJoulesPerLiter**.
   *
   * Must be paired with **decelerationEfficiency**.
   *
   * The range of values allowed are 0.0 to 1/**decelerationEfficiency**.
   *
   * Sensible Values : for **Combustion Model** : 0.33, for **Electric Model** : 0.66
   */
  accelerationEfficiency?: number;
  /**
   * Specifies the efficiency of converting kinetic energy to saved (not consumed) fuel when the vehicle decelerates _(i.e. ChemicalEnergySaved/KineticEnergyLost). ChemicalEnergySaved_ is obtained by converting saved (not consumed) fuel to energy using **fuelEnergyDensityInMJoulesPerLiter**.
   *
   * Must be paired with **accelerationEfficiency**.
   *
   * The range of values allowed are 0.0 to 1/**accelerationEfficiency**.
   *
   * Sensible Values : for **Combustion Model** : 0.83, for **Electric Model** : 0.91
   */
  decelerationEfficiency?: number;
  /**
   * Specifies the efficiency of converting chemical energy stored in fuel to potential energy when the vehicle gains elevation _(i.e. PotentialEnergyGained/ChemicalEnergyConsumed). ChemicalEnergyConsumed_ is obtained by converting consumed fuel to chemical energy using **fuelEnergyDensityInMJoulesPerLiter**.
   *
   * Must be paired with **downhillEfficiency**.
   *
   * The range of values allowed are 0.0 to 1/**downhillEfficiency**.
   *
   * Sensible Values : for **Combustion Model** : 0.27, for **Electric Model** : 0.74
   */
  uphillEfficiency?: number;
  /**
   * Specifies the efficiency of converting potential energy to saved (not consumed) fuel when the vehicle loses elevation _(i.e. ChemicalEnergySaved/PotentialEnergyLost). ChemicalEnergySaved_ is obtained by converting saved (not consumed) fuel to energy using **fuelEnergyDensityInMJoulesPerLiter**.
   *
   * Must be paired with **uphillEfficiency**.
   *
   * The range of values allowed are 0.0 to 1/**uphillEfficiency**.
   *
   * Sensible Values : for **Combustion Model** : 0.51, for **Electric Model** : 0.73
   */
  downhillEfficiency?: number;
  /**
   * Specifies the speed-dependent component of consumption.
   *
   * Provided as an unordered list of speed/consumption-rate pairs. The list defines points on a consumption curve. Consumption rates for speeds not in the list are found as follows:
   *
   * * by linear interpolation, if the given speed lies in between two speeds in the list
   *
   * * by linear extrapolation otherwise, assuming a constant (ΔConsumption/ΔSpeed) determined by the nearest two points in the list
   *
   * The list must contain between 1 and 25 points (inclusive), and may not contain duplicate points for the same speed. If it only contains a single point, then the consumption rate of that point is used without further processing.
   *
   * Consumption specified for the largest speed must be greater than or equal to that of the penultimate largest speed. This ensures that extrapolation does not lead to negative consumption rates.
   *
   * Similarly, consumption values specified for the two smallest speeds in the list cannot lead to a negative consumption rate for any smaller  speed.
   *
   * The valid range for the consumption values(expressed in kWh/100km) is between 0.01 and 100000.0.
   *
   * Sensible Values : 50,8.2:130,21.3
   *
   * This parameter is required for **Electric consumption model**.
   */
  constantSpeedConsumptionInkWhPerHundredkm?: string;
  /**
   * Specifies the current electric energy supply in kilowatt hours (kWh).
   *
   * This parameter co-exists with **maxChargeInkWh** parameter.
   *
   * The range of values allowed are 0.0 to **maxChargeInkWh**.
   *
   * Sensible Values : 43
   */
  currentChargeInkWh?: number;
  /**
   * Specifies the maximum electric energy supply in kilowatt hours (kWh) that may be stored in the vehicle's battery.
   *
   * This parameter co-exists with **currentChargeInkWh** parameter.
   *
   * Minimum value has to be greater than or equal to **currentChargeInkWh**.
   *
   * Sensible Values : 85
   */
  maxChargeInkWh?: number;
  /**
   * Specifies the amount of power consumed for sustaining auxiliary systems, in kilowatts (kW).
   *
   * It can be used to specify consumption due to devices and systems such as AC systems, radio, heating, etc.
   *
   * Sensible Values : 1.7
   */
  auxiliaryPowerInkW?: number;
}

export interface RouteGetRouteDirectionsWithAdditionalParametersQueryParam {
  queryParameters: RouteGetRouteDirectionsWithAdditionalParametersQueryParamProperties;
}

export interface RouteGetRouteDirectionsWithAdditionalParametersMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type RouteGetRouteDirectionsWithAdditionalParametersParameters =
  RouteGetRouteDirectionsWithAdditionalParametersQueryParam &
    RouteGetRouteDirectionsWithAdditionalParametersMediaTypesParam &
    RouteGetRouteDirectionsWithAdditionalParametersBodyParam &
    RequestParameters;

export interface RouteGetRouteRangeQueryParamProperties {
  /** The Coordinate from which the range calculation should start. */
  query: Array<number>;
  /** Fuel budget in liters that determines maximal range which can be travelled using the specified Combustion Consumption Model.<br> When fuelBudgetInLiters is used, it is mandatory to specify a detailed  Combustion Consumption Model.<br> Exactly one budget (fuelBudgetInLiters, energyBudgetInkWh, timeBudgetInSec, or distanceBudgetInMeters) must be used. */
  fuelBudgetInLiters?: number;
  /** Electric energy budget in kilowatt hours (kWh) that determines maximal range which can be travelled using the specified Electric Consumption Model.<br> When energyBudgetInkWh is used, it is mandatory to specify a detailed Electric Consumption Model.<br> Exactly one budget (fuelBudgetInLiters, energyBudgetInkWh, timeBudgetInSec, or distanceBudgetInMeters) must be used. */
  energyBudgetInkWh?: number;
  /** Time budget in seconds that determines maximal range which can be travelled using driving time. The Consumption Model will only affect the range when routeType is eco.<br> Exactly one budget (fuelBudgetInLiters, energyBudgetInkWh, timeBudgetInSec, or distanceBudgetInMeters) must be used. */
  timeBudgetInSec?: number;
  /** Distance budget in meters that determines maximal range which can be travelled using driving distance.  The Consumption Model will only affect the range when routeType is eco.<br> Exactly one budget (fuelBudgetInLiters, energyBudgetInkWh, timeBudgetInSec, or distanceBudgetInMeters) must be used. */
  distanceBudgetInMeters?: number;
  /**
   * The date and time of departure from the origin point formatted as a `dateTime` value as defined in [RFC 3339, section 5.6](https://www.rfc-editor.org/rfc/rfc3339#section-5.6), with an optional time zone offset. When a time zone offset is not specified, it will be assumed to be that of the origin point.
   *   * Default value: now
   *   * Other value: `dateTime`
   *
   * Examples:
   *   * 2023-12-19T16:39:57
   *   * 2023-12-19T16:39:57-08:00
   *
   * The `departAt` parameter cannot be used in conjunction with `arriveAt`.
   */
  departAt?: Date | string;
  /** The type of route requested. */
  routeType?: "fastest" | "shortest" | "eco" | "thrilling";
  /**
   * Possible values:
   *   * true - Do consider all available traffic information during routing
   *   * false - Ignore current traffic data during routing. Note that although the current traffic data is ignored
   *   during routing, the effect of historic traffic on effective road speeds is still incorporated.
   */
  traffic?: boolean;
  /** Specifies something that the route calculation should try to avoid when determining the route. Can be specified multiple times in one request, for example, '&avoid=motorways&avoid=tollRoads&avoid=ferries'. In Route Range requests, the value alreadyUsedRoads must not be used. */
  avoid?: Array<
    | "tollRoads"
    | "motorways"
    | "ferries"
    | "unpavedRoads"
    | "carpools"
    | "alreadyUsedRoads"
    | "borderCrossings"
  >;
  /** The mode of travel for the requested route. If not defined, default is 'car'. Note that the requested travelMode may not be available for the entire route. Where the requested travelMode is not available for a particular section, the travelMode element of the response for that section will be "other". Note that travel modes bus, motorcycle, taxi and van are BETA functionality. Full restriction data is not available in all areas. */
  travelMode?:
    | "car"
    | "truck"
    | "taxi"
    | "bus"
    | "van"
    | "motorcycle"
    | "bicycle"
    | "pedestrian";
  /** Degree of hilliness for thrilling route. This parameter can only be used in conjunction with `routeType`=thrilling. */
  hilliness?: "low" | "normal" | "high";
  /** Level of turns for thrilling route. This parameter can only be used in conjunction with `routeType`=thrilling. */
  windingness?: "low" | "normal" | "high";
  /** Weight per axle of the vehicle in kg. A value of 0 means that weight restrictions per axle are not considered. */
  vehicleAxleWeight?: number;
  /** Width of the vehicle in meters. A value of 0 means that width restrictions are not considered. */
  vehicleWidth?: number;
  /** Height of the vehicle in meters. A value of 0 means that height restrictions are not considered. */
  vehicleHeight?: number;
  /** Length of the vehicle in meters. A value of 0 means that length restrictions are not considered. */
  vehicleLength?: number;
  /**
   * Maximum speed of the vehicle in km/hour. The max speed in the vehicle profile is used to check whether a vehicle is allowed on motorways.
   *
   * * A value of 0 means that an appropriate value for the vehicle will be determined and applied during route planning.
   *
   * * A non-zero value may be overridden during route planning. For example, the current traffic flow is 60 km/hour. If the vehicle  maximum speed is set to 50 km/hour, the routing engine will consider 60 km/hour as this is the current situation.  If the maximum speed of the vehicle is provided as 80 km/hour but the current traffic flow is 60 km/hour, then routing engine will again use 60 km/hour.
   */
  vehicleMaxSpeed?: number;
  /**
   * Weight of the vehicle in kilograms.
   *
   * * It is mandatory if any of the *Efficiency parameters are set.
   *
   * * It must be strictly positive when used in the context of the Consumption Model. Weight restrictions are considered.
   *
   * * If no detailed **Consumption Model** is specified and the value of **vehicleWeight** is non-zero, then weight restrictions are considered.
   *
   * * In all other cases, this parameter is ignored.
   *
   * Sensible Values : for **Combustion Model** : 1600, for **Electric Model** : 1900
   */
  vehicleWeight?: number;
  /** Whether the vehicle is used for commercial purposes. Commercial vehicles may not be allowed to drive on some roads. */
  vehicleCommercial?: boolean;
  /** Types of cargo that may be classified as hazardous materials and restricted from some roads. Available vehicleLoadType values are US Hazmat classes 1 through 9, plus generic classifications for use in other countries/regions. Values beginning with USHazmat are for US routing while otherHazmat should be used for all other countries/regions. vehicleLoadType can be specified multiple times. This parameter is currently only considered for travelMode=truck. */
  vehicleLoadType?:
    | "USHazmatClass1"
    | "USHazmatClass2"
    | "USHazmatClass3"
    | "USHazmatClass4"
    | "USHazmatClass5"
    | "USHazmatClass6"
    | "USHazmatClass7"
    | "USHazmatClass8"
    | "USHazmatClass9"
    | "otherHazmatExplosive"
    | "otherHazmatGeneral"
    | "otherHazmatHarmfulToWater";
  /** Engine type of the vehicle. When a detailed Consumption Model is specified, it must be consistent with the value of **vehicleEngineType**. */
  vehicleEngineType?: "combustion" | "electric";
  /**
   *
   * Specifies the speed-dependent component of consumption.
   *
   * Provided as an unordered list of colon-delimited speed & consumption-rate pairs. The list defines points on a consumption curve. Consumption rates for speeds not in the list are found as follows:
   *
   *  * by linear interpolation, if the given speed lies in between two speeds in the list
   *
   *  * by linear extrapolation otherwise, assuming a constant (ΔConsumption/ΔSpeed) determined by the nearest two points in the list
   *
   * The list must contain between 1 and 25 points (inclusive), and may not contain duplicate points for the same speed. If it only contains a single point, then the consumption rate of that point is used without further processing.
   *
   * Consumption specified for the largest speed must be greater than or equal to that of the penultimate largest speed. This ensures that extrapolation does not lead to negative consumption rates.
   *
   * Similarly, consumption values specified for the two smallest speeds in the list cannot lead to a negative consumption rate for any smaller speed.
   *
   * The valid range for the consumption values(expressed in l/100km) is between 0.01 and 100000.0.
   *
   * Sensible Values : 50,6.3:130,11.5
   *
   * **Note** : This parameter is required for **The Combustion Consumption Model**.
   */
  constantSpeedConsumptionInLitersPerHundredkm?: string;
  /**
   * Specifies the current supply of fuel in liters.
   *
   * Sensible Values : 55
   */
  currentFuelInLiters?: number;
  /**
   * Specifies the amount of fuel consumed for sustaining auxiliary systems of the vehicle, in liters per hour.
   *
   * It can be used to specify consumption due to devices and systems such as AC systems, radio, heating, etc.
   *
   * Sensible Values : 0.2
   */
  auxiliaryPowerInLitersPerHour?: number;
  /**
   * Specifies the amount of chemical energy stored in one liter of fuel in megajoules (MJ). It is used in conjunction with the ***Efficiency** parameters for conversions between saved or consumed energy and fuel. For example, energy density is 34.2 MJ/l for gasoline, and 35.8 MJ/l for Diesel fuel.
   *
   * This parameter is required if any ***Efficiency** parameter is set.
   *
   * Sensible Values : 34.2
   */
  fuelEnergyDensityInMJoulesPerLiter?: number;
  /**
   * Specifies the efficiency of converting chemical energy stored in fuel to kinetic energy when the vehicle accelerates _(i.e. KineticEnergyGained/ChemicalEnergyConsumed). ChemicalEnergyConsumed_ is obtained by converting consumed fuel to chemical energy using **fuelEnergyDensityInMJoulesPerLiter**.
   *
   * Must be paired with **decelerationEfficiency**.
   *
   * The range of values allowed are 0.0 to 1/**decelerationEfficiency**.
   *
   * Sensible Values : for **Combustion Model** : 0.33, for **Electric Model** : 0.66
   */
  accelerationEfficiency?: number;
  /**
   * Specifies the efficiency of converting kinetic energy to saved (not consumed) fuel when the vehicle decelerates _(i.e. ChemicalEnergySaved/KineticEnergyLost). ChemicalEnergySaved_ is obtained by converting saved (not consumed) fuel to energy using **fuelEnergyDensityInMJoulesPerLiter**.
   *
   * Must be paired with **accelerationEfficiency**.
   *
   * The range of values allowed are 0.0 to 1/**accelerationEfficiency**.
   *
   * Sensible Values : for **Combustion Model** : 0.83, for **Electric Model** : 0.91
   */
  decelerationEfficiency?: number;
  /**
   * Specifies the efficiency of converting chemical energy stored in fuel to potential energy when the vehicle gains elevation _(i.e. PotentialEnergyGained/ChemicalEnergyConsumed). ChemicalEnergyConsumed_ is obtained by converting consumed fuel to chemical energy using **fuelEnergyDensityInMJoulesPerLiter**.
   *
   * Must be paired with **downhillEfficiency**.
   *
   * The range of values allowed are 0.0 to 1/**downhillEfficiency**.
   *
   * Sensible Values : for **Combustion Model** : 0.27, for **Electric Model** : 0.74
   */
  uphillEfficiency?: number;
  /**
   * Specifies the efficiency of converting potential energy to saved (not consumed) fuel when the vehicle loses elevation _(i.e. ChemicalEnergySaved/PotentialEnergyLost). ChemicalEnergySaved_ is obtained by converting saved (not consumed) fuel to energy using **fuelEnergyDensityInMJoulesPerLiter**.
   *
   * Must be paired with **uphillEfficiency**.
   *
   * The range of values allowed are 0.0 to 1/**uphillEfficiency**.
   *
   * Sensible Values : for **Combustion Model** : 0.51, for **Electric Model** : 0.73
   */
  downhillEfficiency?: number;
  /**
   * Specifies the speed-dependent component of consumption.
   *
   * Provided as an unordered list of speed/consumption-rate pairs. The list defines points on a consumption curve. Consumption rates for speeds not in the list are found as follows:
   *
   * * by linear interpolation, if the given speed lies in between two speeds in the list
   *
   * * by linear extrapolation otherwise, assuming a constant (ΔConsumption/ΔSpeed) determined by the nearest two points in the list
   *
   * The list must contain between 1 and 25 points (inclusive), and may not contain duplicate points for the same speed. If it only contains a single point, then the consumption rate of that point is used without further processing.
   *
   * Consumption specified for the largest speed must be greater than or equal to that of the penultimate largest speed. This ensures that extrapolation does not lead to negative consumption rates.
   *
   * Similarly, consumption values specified for the two smallest speeds in the list cannot lead to a negative consumption rate for any smaller  speed.
   *
   * The valid range for the consumption values(expressed in kWh/100km) is between 0.01 and 100000.0.
   *
   * Sensible Values : 50,8.2:130,21.3
   *
   * This parameter is required for **Electric consumption model**.
   */
  constantSpeedConsumptionInkWhPerHundredkm?: string;
  /**
   * Specifies the current electric energy supply in kilowatt hours (kWh).
   *
   * This parameter co-exists with **maxChargeInkWh** parameter.
   *
   * The range of values allowed are 0.0 to **maxChargeInkWh**.
   *
   * Sensible Values : 43
   */
  currentChargeInkWh?: number;
  /**
   * Specifies the maximum electric energy supply in kilowatt hours (kWh) that may be stored in the vehicle's battery.
   *
   * This parameter co-exists with **currentChargeInkWh** parameter.
   *
   * Minimum value has to be greater than or equal to **currentChargeInkWh**.
   *
   * Sensible Values : 85
   */
  maxChargeInkWh?: number;
  /**
   * Specifies the amount of power consumed for sustaining auxiliary systems, in kilowatts (kW).
   *
   * It can be used to specify consumption due to devices and systems such as AC systems, radio, heating, etc.
   *
   * Sensible Values : 1.7
   */
  auxiliaryPowerInkW?: number;
}

export interface RouteGetRouteRangeQueryParam {
  queryParameters: RouteGetRouteRangeQueryParamProperties;
}

export type RouteGetRouteRangeParameters = RouteGetRouteRangeQueryParam &
  RequestParameters;

export interface RouteRequestRouteDirectionsBatchBodyParam {
  /** The list of route directions queries/requests to process. The list can contain a max of 700 queries for async and 100 queries for sync version and must contain at least 1 query. */
  body: BatchRequest;
}

export interface RouteRequestRouteDirectionsBatchMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type RouteRequestRouteDirectionsBatchParameters =
  RouteRequestRouteDirectionsBatchMediaTypesParam &
    RouteRequestRouteDirectionsBatchBodyParam &
    RequestParameters;
export type RouteGetRouteDirectionsBatchParameters = RequestParameters;

export interface RouteRequestRouteDirectionsBatchSyncBodyParam {
  /** The list of route directions queries/requests to process. The list can contain  a max of 700 queries for async and 100 queries for sync version and must contain at least 1 query. */
  body: BatchRequest;
}

export interface RouteRequestRouteDirectionsBatchSyncMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type RouteRequestRouteDirectionsBatchSyncParameters =
  RouteRequestRouteDirectionsBatchSyncMediaTypesParam &
    RouteRequestRouteDirectionsBatchSyncBodyParam &
    RequestParameters;
