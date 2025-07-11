// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ServiceFabricManagedClustersManagementClient } from "./serviceFabricManagedClustersManagementClient.js";
export { restorePoller, RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  OperationResult,
  AvailableOperationDisplay,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  ApplicationResource,
  ApplicationResourceProperties,
  ApplicationUserAssignedIdentity,
  ApplicationUpgradePolicy,
  ApplicationHealthPolicy,
  ServiceTypeHealthPolicy,
  RollingUpgradeMonitoringPolicy,
  KnownFailureAction,
  FailureAction,
  KnownRollingUpgradeMode,
  RollingUpgradeMode,
  ManagedIdentity,
  ManagedIdentityType,
  UserAssignedIdentity,
  ProxyResource,
  Resource,
  SystemData,
  KnownCreatedByType,
  CreatedByType,
  ApplicationUpdateParameters,
  RuntimeResumeApplicationUpgradeParameters,
  ApplicationTypeResource,
  ApplicationTypeResourceProperties,
  ApplicationTypeUpdateParameters,
  ApplicationTypeVersionResource,
  ApplicationTypeVersionResourceProperties,
  ApplicationTypeVersionUpdateParameters,
  ServiceResource,
  ServiceResourceProperties,
  ServiceResourcePropertiesUnion,
  KnownServiceKind,
  ServiceKind,
  Partition,
  PartitionUnion,
  KnownPartitionScheme,
  PartitionScheme,
  UniformInt64RangePartitionScheme,
  SingletonPartitionScheme,
  NamedPartitionScheme,
  KnownServicePackageActivationMode,
  ServicePackageActivationMode,
  StatefulServiceProperties,
  StatelessServiceProperties,
  ServiceResourcePropertiesBase,
  ServiceCorrelation,
  KnownServiceCorrelationScheme,
  ServiceCorrelationScheme,
  ServiceLoadMetric,
  KnownServiceLoadMetricWeight,
  ServiceLoadMetricWeight,
  ServicePlacementPolicy,
  ServicePlacementPolicyUnion,
  KnownServicePlacementPolicyType,
  ServicePlacementPolicyType,
  ServicePlacementInvalidDomainPolicy,
  ServicePlacementRequiredDomainPolicy,
  ServicePlacementPreferPrimaryDomainPolicy,
  ServicePlacementRequireDomainDistributionPolicy,
  ServicePlacementNonPartiallyPlaceServicePolicy,
  KnownMoveCost,
  MoveCost,
  ScalingPolicy,
  ScalingMechanism,
  ScalingMechanismUnion,
  KnownServiceScalingMechanismKind,
  ServiceScalingMechanismKind,
  AddRemoveIncrementalNamedPartitionScalingMechanism,
  PartitionInstanceCountScaleMechanism,
  ScalingTrigger,
  ScalingTriggerUnion,
  KnownServiceScalingTriggerKind,
  ServiceScalingTriggerKind,
  AveragePartitionLoadScalingTrigger,
  AverageServiceLoadScalingTrigger,
  ServiceUpdateParameters,
  ManagedClusterCodeVersionResult,
  ManagedClusterVersionDetails,
  KnownOsType,
  OsType,
  ManagedVMSize,
  VMSize,
  ManagedCluster,
  ManagedClusterProperties,
  KnownClusterState,
  ClusterState,
  LoadBalancingRule,
  KnownProtocol,
  Protocol,
  KnownProbeProtocol,
  ProbeProtocol,
  NetworkSecurityRule,
  KnownNsgProtocol,
  NsgProtocol,
  KnownAccess,
  Access,
  KnownDirection,
  Direction,
  ClientCertificate,
  AzureActiveDirectory,
  SettingsSectionDescription,
  SettingsParameterDescription,
  KnownManagedResourceProvisioningState,
  ManagedResourceProvisioningState,
  KnownClusterUpgradeMode,
  ClusterUpgradeMode,
  KnownClusterUpgradeCadence,
  ClusterUpgradeCadence,
  KnownManagedClusterAddOnFeature,
  ManagedClusterAddOnFeature,
  ApplicationTypeVersionsCleanupPolicy,
  IpTag,
  Subnet,
  KnownPrivateEndpointNetworkPolicies,
  PrivateEndpointNetworkPolicies,
  KnownPrivateLinkServiceNetworkPolicies,
  PrivateLinkServiceNetworkPolicies,
  ServiceEndpoint,
  KnownZonalUpdateMode,
  ZonalUpdateMode,
  ClusterUpgradePolicy,
  ClusterHealthPolicy,
  ClusterUpgradeDeltaHealthPolicy,
  ClusterMonitoringPolicy,
  KnownAutoGeneratedDomainNameLabelScope,
  AutoGeneratedDomainNameLabelScope,
  Sku,
  KnownSkuName,
  SkuName,
  TrackedResource,
  ManagedClusterUpdateParameters,
  FaultSimulationIdContent,
  FaultSimulation,
  KnownFaultSimulationStatus,
  FaultSimulationStatus,
  FaultSimulationDetails,
  NodeTypeFaultSimulation,
  KnownSfmcOperationStatus,
  SfmcOperationStatus,
  FaultSimulationContent,
  FaultSimulationContentUnion,
  KnownFaultKind,
  FaultKind,
  FaultSimulationConstraints,
  ZoneFaultSimulationContent,
  FaultSimulationContentWrapper,
  ManagedAzResiliencyStatus,
  ResourceAzStatus,
  ManagedMaintenanceWindowStatus,
  NodeType,
  NodeTypeProperties,
  KnownDiskType,
  DiskType,
  EndpointRangeDescription,
  VaultSecretGroup,
  SubResource,
  VaultCertificate,
  VmssExtension,
  VmssExtensionProperties,
  KnownVmssExtensionSetupOrder,
  VmssExtensionSetupOrder,
  VmManagedIdentity,
  FrontendConfiguration,
  KnownIPAddressType,
  IPAddressType,
  VmssDataDisk,
  KnownEvictionPolicyType,
  EvictionPolicyType,
  KnownVmSetupAction,
  VmSetupAction,
  KnownSecurityType,
  SecurityType,
  KnownSecurityEncryptionType,
  SecurityEncryptionType,
  NodeTypeNatConfig,
  VmImagePlan,
  AdditionalNetworkInterfaceConfiguration,
  IpConfiguration,
  KnownPrivateIPAddressVersion,
  PrivateIPAddressVersion,
  IPConfigurationPublicIPAddressConfiguration,
  KnownPublicIPAddressVersion,
  PublicIPAddressVersion,
  VmApplication,
  NodeTypeSku,
  NodeTypeUpdateParameters,
  NodeTypeActionParameters,
  KnownUpdateType,
  UpdateType,
  NodeTypeAvailableSku,
  NodeTypeSupportedSku,
  NodeTypeSkuCapacity,
  KnownNodeTypeSkuScaleType,
  NodeTypeSkuScaleType,
  LongRunningOperationResult,
  ErrorModelError,
  KnownManagedClusterVersionEnvironment,
  ManagedClusterVersionEnvironment,
  KnownVersions,
} from "./models/index.js";
export { ServiceFabricManagedClustersManagementClientOptionalParams } from "./api/index.js";
export {
  ApplicationsStartRollbackOptionalParams,
  ApplicationsResumeUpgradeOptionalParams,
  ApplicationsReadUpgradeOptionalParams,
  ApplicationsListOptionalParams,
  ApplicationsDeleteOptionalParams,
  ApplicationsUpdateOptionalParams,
  ApplicationsCreateOrUpdateOptionalParams,
  ApplicationsGetOptionalParams,
} from "./api/applications/index.js";
export {
  ApplicationTypesListOptionalParams,
  ApplicationTypesDeleteOptionalParams,
  ApplicationTypesUpdateOptionalParams,
  ApplicationTypesCreateOrUpdateOptionalParams,
  ApplicationTypesGetOptionalParams,
} from "./api/applicationTypes/index.js";
export {
  ApplicationTypeVersionsListByApplicationTypesOptionalParams,
  ApplicationTypeVersionsDeleteOptionalParams,
  ApplicationTypeVersionsUpdateOptionalParams,
  ApplicationTypeVersionsCreateOrUpdateOptionalParams,
  ApplicationTypeVersionsGetOptionalParams,
} from "./api/applicationTypeVersions/index.js";
export { ManagedApplyMaintenanceWindowPostOptionalParams } from "./api/managedApplyMaintenanceWindow/index.js";
export { ManagedAzResiliencyStatusGetOptionalParams } from "./api/managedAzResiliencyStatus/index.js";
export {
  ManagedClustersStopFaultSimulationOptionalParams,
  ManagedClustersStartFaultSimulationOptionalParams,
  ManagedClustersListFaultSimulationOptionalParams,
  ManagedClustersGetFaultSimulationOptionalParams,
  ManagedClustersListBySubscriptionOptionalParams,
  ManagedClustersListByResourceGroupOptionalParams,
  ManagedClustersDeleteOptionalParams,
  ManagedClustersUpdateOptionalParams,
  ManagedClustersCreateOrUpdateOptionalParams,
  ManagedClustersGetOptionalParams,
} from "./api/managedClusters/index.js";
export {
  ManagedClusterVersionListByEnvironmentOptionalParams,
  ManagedClusterVersionGetByEnvironmentOptionalParams,
  ManagedClusterVersionListOptionalParams,
  ManagedClusterVersionGetOptionalParams,
} from "./api/managedClusterVersion/index.js";
export { ManagedMaintenanceWindowStatusGetOptionalParams } from "./api/managedMaintenanceWindowStatus/index.js";
export {
  ManagedUnsupportedVMSizesListOptionalParams,
  ManagedUnsupportedVMSizesGetOptionalParams,
} from "./api/managedUnsupportedVMSizes/index.js";
export {
  NodeTypesListFaultSimulationOptionalParams,
  NodeTypesGetFaultSimulationOptionalParams,
  NodeTypesStopFaultSimulationOptionalParams,
  NodeTypesStartFaultSimulationOptionalParams,
  NodeTypesStartOptionalParams,
  NodeTypesRestartOptionalParams,
  NodeTypesReimageOptionalParams,
  NodeTypesRedeployOptionalParams,
  NodeTypesDeleteNodeOptionalParams,
  NodeTypesDeallocateOptionalParams,
  NodeTypesListByManagedClustersOptionalParams,
  NodeTypesDeleteOptionalParams,
  NodeTypesUpdateOptionalParams,
  NodeTypesCreateOrUpdateOptionalParams,
  NodeTypesGetOptionalParams,
} from "./api/nodeTypes/index.js";
export { NodeTypeSkusListOptionalParams } from "./api/nodeTypeSkus/index.js";
export { OperationResultsGetOptionalParams } from "./api/operationResults/index.js";
export { OperationsListOptionalParams } from "./api/operations/index.js";
export { OperationStatusGetOptionalParams } from "./api/operationStatus/index.js";
export {
  ServicesListByApplicationsOptionalParams,
  ServicesDeleteOptionalParams,
  ServicesUpdateOptionalParams,
  ServicesCreateOrUpdateOptionalParams,
  ServicesGetOptionalParams,
} from "./api/services/index.js";
export {
  ApplicationsOperations,
  ApplicationTypesOperations,
  ApplicationTypeVersionsOperations,
  ManagedApplyMaintenanceWindowOperations,
  ManagedAzResiliencyStatusOperations,
  ManagedClustersOperations,
  ManagedClusterVersionOperations,
  ManagedMaintenanceWindowStatusOperations,
  ManagedUnsupportedVMSizesOperations,
  NodeTypesOperations,
  NodeTypeSkusOperations,
  OperationResultsOperations,
  OperationsOperations,
  OperationStatusOperations,
  ServicesOperations,
} from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
