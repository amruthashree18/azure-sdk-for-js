function GetOnboardingFile($docRepoLocation, $moniker) {
  $packageOnboardingFile = "$docRepoLocation/ci-configs/packages-latest.json"
  if ("preview" -eq $moniker) {
    $packageOnboardingFile = "$docRepoLocation/ci-configs/packages-preview.json"
  }
  elseif ("legacy" -eq $moniker) {
    $packageOnboardingFile = "$docRepoLocation/ci-configs/packages-legacy.json"
  }

  return $packageOnboardingFile
}

function Get-javascript-OnboardedDocsMsPackages($DocRepoLocation) {
  $packageOnboardingFiles = @(
    "$DocRepoLocation/ci-configs/packages-latest.json",
    "$DocRepoLocation/ci-configs/packages-preview.json",
    "$DocRepoLocation/ci-configs/packages-legacy.json")

  $onboardedPackages = @{}
  foreach ($file in $packageOnboardingFiles) {
    $onboardingSpec = ConvertFrom-Json (Get-Content $file -Raw)
    foreach ($spec in $onboardingSpec.npm_package_sources) {
      $packageName = $spec.name
      if ($packageName.LastIndexOf('@') -gt 0) {
        # Package has an '@' symbol deliminting the end of the package name
        $packageName = $packageName.Substring(0, $packageName.LastIndexOf('@'))
      }
      $onboardedPackages[$packageName] = $null
    }
  }

  return $onboardedPackages
}

function Get-javascript-OnboardedDocsMsPackagesForMoniker($DocRepoLocation, $moniker) {
  $packageOnboardingFile = GetOnboardingFile `
    -docRepoLocation $DocRepoLocation `
    -moniker $moniker

  $onboardedPackages = @{}
  $onboardingSpec = ConvertFrom-Json (Get-Content $packageOnboardingFile -Raw)
  foreach ($spec in $onboardingSpec.npm_package_sources) {
    $packageName = $spec.name

    if ($packageName.LastIndexOf('@') -gt 0) {
      # Package has an '@' symbol deliminting the end of the package name
      $packageName = $packageName.Substring(0, $packageName.LastIndexOf('@'))
    }

    $jsStylePkgName = $packageName.Replace("@", "").Replace("/", "-")
    $jsonFile = "$DocRepoLocation/metadata/$moniker/$jsStylePkgName.json"
    if (Test-Path $jsonFile) {
      $onboardedPackages[$packageName] = ConvertFrom-Json (Get-Content $jsonFile -Raw)
    }
    else {
      $onboardedPackages[$packageName] = $null
    }
  }

  return $onboardedPackages
}

function GetPackageReadmeName($packageMetadata) {
  # If there is a metadata json for the package use the DocsMsReadmeName from
  # the metadata function
  if ($packageMetadata.PSObject.Members.Name -contains "FileMetadata") {
    $readmeMetadata = &$GetDocsMsMetadataForPackageFn -PackageInfo $packageMetadata.FileMetadata

    # Packages released outside of our EngSys will have an empty string for
    # DirectoryPath which will result in an empty string for DocsMsReadMeName.
    # In those cases, do not return the empty name and instead use the fallback
    # logic below.
    if ($readmeMetadata.DocsMsReadMeName) {
      return $readmeMetadata.DocsMsReadMeName
    }
  }

  # Fallback to get package-level readme name if metadata file info does not exist
  $packageLevelReadmeName = $packageMetadata.Package.Replace('@azure/', '').Replace('@azure-tools/', '').Replace('azure-', '');

  # Fallback to get package-level readme name if metadata file info does not exist
  if ($packageMetadata.Package.StartsWith('@azure-rest/')) {
    $packageLevelReadmeName = "$($packageMetadata.Package.Replace('@azure-rest/', ''))-rest"
  }

  return $packageLevelReadmeName
}

function Get-javascript-PackageLevelReadme($packageMetadata) {
  return GetPackageReadmeName -packageMetadata $packageMetadata
}

function Get-javascript-DocsMsTocData($packageMetadata, $docRepoLocation) {
  $packageLevelReadmeName = GetPackageReadmeName -packageMetadata $packageMetadata
  $packageTocHeader = GetDocsTocDisplayName $packageMetadata
  $output = [PSCustomObject]@{
    PackageLevelReadmeHref = "~/docs-ref-services/{moniker}/$packageLevelReadmeName-readme.md"
    PackageTocHeader       = $packageTocHeader
    TocChildren            = @($packageMetadata.Package)
  }

  return $output
}

function Get-javascript-DocsMsTocChildrenForManagementPackages($packageMetadata, $docRepoLocation) {
  return @($packageMetadata.Package)
}

function Get-javascript-RepositoryLink ($packageInfo) {
  return "$PackageRepositoryUri/$($packageInfo.Package)"
}

# Defined in common.ps1 as:
# $UpdateDocsMsTocFn = "Get-${Language}-UpdatedDocsMsToc"
function Get-javascript-UpdatedDocsMsToc($toc) {
  $services = $toc[0].items
  for ($i = 0; $i -lt $services.Count; $i++) {

    # Add "Plugin" docs to Identity. Packages associated with these entries do
    # not build successfully in the docs CI system becaues they export nothing
    # that the docs CI system can document. This ensures that the readme pages
    # are documented properly even if their packages are not onboarded.
    if ($services[$i].name -eq 'Identity') {
      $services[$i].items += [PSCustomObject]@{
        name  = "Plugins";
        items = @(
          [PSCustomObject]@{
            name            = "Token Cache Persistence";
            href            = "~/docs-ref-services/{moniker}/identity-cache-persistence-readme.md";
            landingPageType = "Service";
          },
          [PSCustomObject]@{
            name            = "VSCode Authentication";
            href            = "~/docs-ref-services/{moniker}/identity-vscode-readme.md";
            landingPageType = "Service";
          }
        )
      }
    }

    if ($services[$i].name -eq 'Cognitive Services') {
      # Add OpenAI to the ToC for Cognitive Services
      $services[$i].items += [PSCustomObject]@{
        name = "OpenAI";
        href = "~/docs-ref-services/{moniker}/openai-readme.md";
      }

      # Sort the items in the Cognitive Services ToC so OpenAI ends up in the
      # correct place. The "Management" item should always be at the end of the
      # list.
      $management = $services[$i].items | Where-Object { $_.name -eq 'Management' }
      $sortedItems = $services[$i].items | Where-Object { $_.name -ne 'Management' } | Sort-Object -Property name

      $services[$i].items = $sortedItems + $management
    }
  }

  # PowerShell outputs a single object if the output is an array with only one
  # object. The preceeding comma ensures that the output remains an array for
  # appropriate export formatting. Other formatting (e.g. `@($toc)`) does not
  # produce useful outputs.
  return , $toc
}
