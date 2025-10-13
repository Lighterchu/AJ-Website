import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Box, Button, Card, Text, Flex, Stack, Grid } from "@sanity/ui";
import { set } from "sanity";
import { AddIcon, ImagesIcon, CloseIcon } from "@sanity/icons";
import type { ArrayOfObjectsInputProps } from "sanity";
import { client } from "@/sanity/lib/client";
import Image from "next/image";

// Types
interface ImageAsset {
  _id: string;
  url: string;
  originalFilename?: string;
  metadata?: {
    dimensions?: {
      width: number;
      height: number;
    };
  };
}

interface ImageReference {
  _type: "image";
  asset: {
    _type: "reference";
    _ref: string;
  };
  alt?: string;
}

type MultiImageSelectorProps = ArrayOfObjectsInputProps;

// Simple Media Browser Component
function MediaBrowser({
  isOpen,
  onClose,
  onSelect,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (assets: ImageAsset[]) => void;
}) {
  const [assets, setAssets] = React.useState<ImageAsset[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());
  const [search, setSearch] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");

  // Fetch assets when modal opens or search query changes
  React.useEffect(() => {
    if (!isOpen) return;

    setLoading(true);

    console.log("searchQuery", searchQuery);

    client
      .fetch(
        `*[_type == "sanity.imageAsset" && originalFilename match $search] | order(_createdAt desc) [0...100]{
          _id, 
          url, 
          originalFilename,
          metadata {
            dimensions {
              width,
              height
            }
          }
        }`,
        { search: searchQuery ? `*${searchQuery}*` : "*" }
      )
      .then((fetchedAssets: ImageAsset[]) => {
        setAssets(fetchedAssets);
        setLoading(false);
      })
      .catch((error: any) => {
        console.error("Error fetching assets:", error);
        setLoading(false);
      });
  }, [isOpen, searchQuery]);

  const handleSearch = () => {
    setSearchQuery(search);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const toggleSelection = (assetId: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(assetId)) {
      newSelected.delete(assetId);
    } else {
      newSelected.add(assetId);
    }
    setSelectedIds(newSelected);
  };

  const handleSelect = () => {
    const selectedAssets = assets.filter((asset) => selectedIds.has(asset._id));
    onSelect(selectedAssets);
    onClose();
    setSelectedIds(new Set());
  };

  const handleSelectAll = () => {
    const allAssetIds = new Set(assets.map((asset) => asset._id));
    setSelectedIds(allAssetIds);
  };

  const handleDeselectAll = () => {
    setSelectedIds(new Set());
  };

  const allCurrentAssetsSelected =
    assets.length > 0 && assets.every((asset) => selectedIds.has(asset._id));

  if (!isOpen) return null;

  // Use React Portal to render outside the normal DOM hierarchy
  const modalContent = (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999999,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: "95vw",
          height: "90vh",
          backgroundColor: "white",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #d1d5db",
            backgroundColor: "#f9fafb",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          }}
        >
          <Flex gap={3} align="center" wrap="wrap">
            <Text size={3} weight="bold" style={{ color: "#111827" }}>
              Select Images from Media Library
            </Text>
            <Box flex={1} />
            <Button
              icon={CloseIcon}
              mode="ghost"
              onClick={onClose}
              style={{
                color: "#6b7280",
              }}
            />
          </Flex>
        </div>

        {/* Controls Bar */}
        <div
          style={{
            padding: "16px 24px",
            borderBottom: "1px solid #d1d5db",
            backgroundColor: "#ffffff",
          }}
        >
          <Flex gap={3} align="center" wrap="wrap">
            <Box flex={1} style={{ minWidth: "250px" }}>
              <Flex gap={2}>
                <input
                  type="text"
                  placeholder="Search images by filename... (Press Enter or click Search)"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                  style={{
                    flex: 1,
                    padding: "12px 16px",
                    border: "2px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "14px",
                    outline: "none",
                    backgroundColor: "#ffffff",
                    color: "#111827",
                    transition: "border-color 0.2s ease",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#3b82f6";
                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(59, 130, 246, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#d1d5db";
                    e.target.style.boxShadow = "none";
                  }}
                />
                <Button
                  mode="default"
                  onClick={handleSearch}
                  text="Search"
                  disabled={loading}
                  style={{
                    minWidth: "80px",
                    backgroundColor: "#3b82f6",
                    color: "#ffffff",
                    border: "none",
                    fontWeight: "500",
                  }}
                />
              </Flex>
            </Box>
            <Text
              size={1}
              style={{
                color: "#6b7280",
                whiteSpace: "nowrap",
                fontWeight: "500",
              }}
            >
              {assets.length} images shown
            </Text>
            <Button
              mode="ghost"
              onClick={
                allCurrentAssetsSelected ? handleDeselectAll : handleSelectAll
              }
              text={allCurrentAssetsSelected ? "Deselect All" : "Select All"}
              disabled={assets.length === 0}
              style={{
                minWidth: "100px",
                color: "#6b7280",
                fontWeight: "500",
              }}
            />
            <Button
              tone="primary"
              onClick={handleSelect}
              disabled={selectedIds.size === 0}
              text={`Select ${selectedIds.size} image${
                selectedIds.size !== 1 ? "s" : ""
              }`}
              style={{
                minWidth: "140px",
                backgroundColor: selectedIds.size === 0 ? "#9ca3af" : "#3b82f6",
                color: "#ffffff",
                fontWeight: "600",
              }}
            />
          </Flex>
        </div>

        {/* Main Content Area */}
        <div
          style={{
            flex: 1,
            overflow: "hidden",
            backgroundColor: "#f8fafc",
          }}
        >
          {loading ? (
            <Flex
              align="center"
              justify="center"
              style={{ height: "100%", backgroundColor: "#ffffff" }}
            >
              <Stack space={3}>
                <Text size={2} weight="medium" style={{ color: "#111827" }}>
                  Loading images...
                </Text>
                <Text
                  size={1}
                  style={{ color: "#6b7280", textAlign: "center" }}
                >
                  Fetching recent images from your media library
                </Text>
              </Stack>
            </Flex>
          ) : (
            <div
              style={{
                height: "100%",
                overflow: "auto",
                padding: "24px",
              }}
            >
              <Grid
                columns={[2, 3, 4, 5, 6]}
                gap={4}
                style={{
                  minHeight: "100%",
                  paddingBottom: "20px",
                }}
              >
                {assets.map((asset) => (
                  <Card
                    key={asset._id}
                    padding={3}
                    shadow={selectedIds.has(asset._id) ? 3 : 1}
                    radius={2}
                    tone={selectedIds.has(asset._id) ? "positive" : "default"}
                    onClick={() => toggleSelection(asset._id)}
                    style={{
                      cursor: "pointer",
                      position: "relative",
                      transition: "all 0.2s ease",
                      border: selectedIds.has(asset._id)
                        ? "3px solid #10b981"
                        : "2px solid #e5e7eb",
                      backgroundColor: selectedIds.has(asset._id)
                        ? "#f0fdf4"
                        : "#ffffff",
                      transform: selectedIds.has(asset._id)
                        ? "scale(1.02)"
                        : "scale(1)",
                    }}
                    onMouseEnter={(e) => {
                      if (!selectedIds.has(asset._id)) {
                        e.currentTarget.style.borderColor = "#9ca3af";
                        e.currentTarget.style.transform = "scale(1.01)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!selectedIds.has(asset._id)) {
                        e.currentTarget.style.borderColor = "#e5e7eb";
                        e.currentTarget.style.transform = "scale(1)";
                      }
                    }}
                  >
                    {selectedIds.has(asset._id) && (
                      <div
                        style={{
                          position: "absolute",
                          top: 8,
                          left: 8,
                          zIndex: 1,
                          backgroundColor: "#10b981",
                          color: "#ffffff",
                          borderRadius: "50%",
                          width: "24px",
                          height: "24px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: "bold",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                        }}
                      >
                        ✓
                      </div>
                    )}
                    <Box style={{ marginBottom: "12px" }}>
                      {/* import Image from "next/image"; */}
                      <Image
                        src={`${asset.url}?w=300&h=300&fit=crop&q=85`}
                        alt={asset.originalFilename || "Image"}
                        width={300}
                        height={200}
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                          borderRadius: "6px",
                          display: "block",
                        }}
                      />
                    </Box>
                    <Text
                      size={1}
                      weight={
                        selectedIds.has(asset._id) ? "semibold" : "medium"
                      }
                      style={{
                        display: "block",
                        lineHeight: "1.4",
                        wordBreak: "break-word",
                        hyphens: "auto",
                        color: selectedIds.has(asset._id)
                          ? "#059669"
                          : "#111827",
                        marginBottom: "4px",
                      }}
                      title={asset.originalFilename || "Untitled"}
                    >
                      {asset.originalFilename || "Untitled"}
                    </Text>
                    {asset.metadata?.dimensions && (
                      <Text
                        size={0}
                        style={{
                          color: "#6b7280",
                          display: "block",
                          fontWeight: "500",
                        }}
                      >
                        {asset.metadata.dimensions.width} ×{" "}
                        {asset.metadata.dimensions.height}
                      </Text>
                    )}
                  </Card>
                ))}
              </Grid>
            </div>
          )}

          {!loading && assets.length === 0 && (
            <Flex
              align="center"
              justify="center"
              direction="column"
              gap={3}
              style={{ height: "100%", backgroundColor: "#ffffff" }}
            >
              <ImagesIcon style={{ fontSize: "64px", color: "#9ca3af" }} />
              <Stack space={2}>
                <Text size={2} weight="medium" style={{ color: "#374151" }}>
                  {searchQuery
                    ? "No images match your search"
                    : "No images found"}
                </Text>
                {searchQuery && (
                  <Text
                    size={1}
                    style={{ color: "#6b7280", textAlign: "center" }}
                  >
                    Try adjusting your search terms
                  </Text>
                )}
              </Stack>
            </Flex>
          )}
        </div>
      </div>
    </div>
  );

  // Render in a portal to escape Sanity's DOM hierarchy
  return typeof document !== "undefined"
    ? ReactDOM.createPortal(modalContent, document.body)
    : null;
}

// Sortable Image Item Component

export function MultiImageSelector(props: MultiImageSelectorProps) {
  const { value = [], onChange, renderDefault } = props;
  const onChangeRef = React.useRef(onChange);
  onChangeRef.current = onChange;

  const imageValue = React.useMemo(
    () => value as unknown as ImageReference[],
    [value]
  );
  const [showMediaBrowser, setShowMediaBrowser] = useState(false);

  // Fetch asset details for selected images

  const handleSelectFromMedia = (selectedMedia: ImageAsset[]) => {
    const newImageReferences = selectedMedia.map((asset, index) => ({
      _key: asset._id + index,
      _type: "image" as const,
      asset: { _type: "reference" as const, _ref: asset._id },
      alt: asset.originalFilename || "",
    }));

    const next = [...(imageValue || []), ...newImageReferences];
    onChangeRef.current(set(next));
  };

  return (
    <Stack space={4}>
      {/* Header with controls */}
      <Flex align="center" justify="space-between" gap={3}>
        <Text size={2} weight="medium">
          Select Images{" "}
          {imageValue?.length > 0 && `(${imageValue.length} selected)`}
        </Text>

        <Flex gap={2}>
          <Button
            icon={AddIcon}
            mode="ghost"
            tone="primary"
            onClick={() => setShowMediaBrowser(true)}
            text="Select Images"
          />
        </Flex>
      </Flex>

        {renderDefault(props)}

      {/* Media Browser Modal */}
      <MediaBrowser
        isOpen={showMediaBrowser}
        onClose={() => setShowMediaBrowser(false)}
        onSelect={handleSelectFromMedia}
      />
    </Stack>
  );
}
