export interface ChartsConfig { // Add export here
  chart: {
    toolbar: {
      show: boolean;
    };
  };
  title: {
    show: string; // Or boolean, if it's meant to be a toggle
  };
  dataLabels: {
    enabled: boolean;
  };
  xaxis: {
    axisTicks: {
      show: boolean;
    };
    axisBorder: {
      show: boolean;
    };
    labels: {
      style: {
        colors: string;
        fontSize: string;
        fontFamily: string;
        fontWeight: number;
      };
    };
  };
  yaxis: {
    labels: {
      style: {
        colors: string;
        fontSize: string;
        fontFamily: string;
        fontWeight: number;
      };
    };
  };
  grid: {
    show: boolean;
    borderColor: string;
    strokeDashArray: number;
    xaxis: {
      lines: {
        show: boolean;
      };
    };
    padding: {
      top: number;
      right: number;
    };
  };
  fill: {
    opacity: number;
  };
  tooltip: {
    theme: string; // Could be "dark" | "light" or other specific theme names
  };
}

export const chartsConfig: ChartsConfig = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  title: {
    show: "",
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    labels: {
      style: {
        colors: "#37474f",
        fontSize: "13px",
        fontFamily: "inherit",
        fontWeight: 300,
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#37474f",
        fontSize: "13px",
        fontFamily: "inherit",
        fontWeight: 300,
      },
    },
  },
  grid: {
    show: true,
    borderColor: "#dddddd",
    strokeDashArray: 5,
    xaxis: {
      lines: {
        show: true,
      },
    },
    padding: {
      top: 5,
      right: 20,
    },
  },
  fill: {
    opacity: 0.8,
  },
  tooltip: {
    theme: "dark",
  },
};

// As chartsConfig is already exported as a named export,
// the default export might be redundant unless specifically used elsewhere.
// For now, I'll keep it as it was.
export default chartsConfig;
