import { API } from "./api/api.js";

export const sections = {
  Cycles: {
    title: "Cycles Metrics",
    api: API.getCycleData,
    metrics: {
      strain: {
        key: "strain",
        name: "Strain",
        extractor: (record) => record.score?.strain,
      },
      avg_heart_rate: {
        key: "avg_heart_rate",
        name: "Average Heart Rate",
        extractor: (record) => record.score?.average_heart_rate,
      },
      max_heart_rate: {
        key: "max_heart_rate",
        name: "Max Heart Rate",
        extractor: (record) => record.score?.max_heart_rate,
      },
      kilojoule: {
        key: "kilojoule",
        name: "Kilojoule",
        extractor: (record) => record.score?.kilojoule,
      },
    },
  },
  Sleep: {
    title: "Sleep Metrics",
    api: API.getSleepData,
    metrics: {
      baseline_hr: {
        key: "baseline_hr",
        name: "Baseline Sleep Need",
        extractor: (record) => record.score?.sleep_needed?.baseline_milli,
        transformForCustom: true,
        valuesTransform: (value) => value / 1000 / 60 / 60,
      },
      sleep_performance_pct: {
        key: "sleep_performance_pct",
        name: "Sleep Performance %",
        extractor: (record) => record.score?.sleep_performance_percentage,
        props: {
          symbol: "%",
        },
      },
      sleep_efficiency_pct: {
        key: "sleep_efficiency_pct",
        name: "Sleep Efficiency %",
        extractor: (record) => record.score?.sleep_efficiency_percentage,
        props: {
          symbol: "%",
        },
      },
      sleep_consistency_pct: {
        key: "sleep_consistency_pct",
        name: "Sleep Consistency %",
        extractor: (record) => record.score?.sleep_consistency_percentage,
        props: {
          symbol: "%",
        },
      },
      total_rem_sleep_hr: {
        key: "total_rem_sleep_hr",
        name: "Total REM Sleep",
        extractor: (record) =>
          record.score?.stage_summary?.total_rem_sleep_time_milli,
        valuesTransform: (value) => value / 1000 / 60 / 60,
        props: {
          symbol: " hr",
        },
      },
      total_in_bed_time_hr: {
        key: "total_in_bed_time_hr",
        name: "Total In Bed Time",
        extractor: (record) =>
          record.score?.stage_summary?.total_in_bed_time_milli,
        valuesTransform: (value) => value / 1000 / 60 / 60,
        props: {
          symbol: " hr",
        },
      },
      total_awake_time_hr: {
        key: "total_awake_time_hr",
        name: "Total Awake Time",
        extractor: (record) =>
          record.score?.stage_summary?.total_awake_time_milli,
        valuesTransform: (value) => value / 1000 / 60 / 60,
      },
      sleep_dept_hr: {
        key: "sleep_dept_hr",
        name: "Sleep Debt",
        extractor: (record) =>
          record.score?.sleep_needed?.need_from_sleep_debt_milli,
        valuesTransform: (value) => value / 1000 / 60 / 60,
        props: {
          symbol: " hr",
        },
      },
      sleep_needed_from_strain_hr: {
        key: "sleep_needed_from_strain_hr",
        name: "Sleep Needed From Recent Strain",
        extractor: (record) =>
          record.score?.sleep_needed?.need_from_recent_strain_milli,
        valuesTransform: (value) => value / 1000 / 60 / 60,
      },
      sleep_cycle_count: {
        key: "sleep_cycle_count",
        name: "Sleep Cycle Count",
        extractor: (record) => record.score?.stage_summary?.sleep_cycle_count,
      },
      disturbance_count: {
        key: "disturbance_count",
        name: "Disturbance Count",
        extractor: (record) => record.score?.stage_summary?.disturbance_count,
      },
      respiratory_rate: {
        key: "respiratory_rate",
        name: "Respiratory Rate",
        extractor: (record) => record.score?.respiratory_rate,
      },
    },
  },
  Recovery: {
    title: "Recovery Metrics",
    api: API.getRecoveryData,
    metrics: {
      recovery_score: {
        key: "recovery_score",
        name: "Recovery Score",
        extractor: (record) => record.score?.recovery_score,
        props: {
          symbol: "%",
        },
      },
      hrv_rmssd_ms: {
        key: "hrv_rmssd_ms",
        name: "HRV RMSSD",
        extractor: (record) => record.score?.hrv_rmssd_milli,
        props: {
          symbol: " ms",
        },
      },
      resting_heart_rate: {
        key: "resting_heart_rate",
        name: "Resting Heart Rate",
        extractor: (record) => record.score?.resting_heart_rate,
      },
      spo2_pct: {
        key: "spo2_pct",
        name: "SpO2 Percentage",
        extractor: (record) => record.score?.spo2_percentage,
        props: {
          symbol: "%",
        },
      },
      skin_temp_c: {
        key: "skin_temp_c",
        name: "Skin Temperature Celsius",
        extractor: (record) => record.score?.skin_temp_celsius,
        props: {
          symbol: "°C",
        },
      },
    },
  },
  Workouts: {
    title: "Workout Metrics",
    api: API.getWorkoutData,
    metrics: {
      strain: {
        key: "strain",
        name: "Strain",
        extractor: (record) => record.score?.strain,
      },
      kilojoule: {
        key: "kilojoule",
        name: "Kilojoule",
        extractor: (record) => record.score?.kilojoule,
      },
      distance_km: {
        key: "distance_km",
        name: "Distance Kilometers",
        extractor: (record) => record.score?.distance_meter,
        transformForCustom: true,
        valuesTransform: (value) => value / 1000 || 0,
        props: {
          symbol: " km",
        },
      },
      altitude_gain_meter: {
        key: "altitude_gain_meter",
        name: "Altitude Gain Meters",
        extractor: (record) => record.score?.altitude_gain_meter,
        transformForCustom: true,
        valuesTransform: (value) => value || 0,
      },
      avg_heart_rate: {
        key: "avg_heart_rate",
        name: "Average Heart Rate",
        extractor: (record) => record.score?.average_heart_rate,
      },
      max_heart_rate: {
        key: "max_heart_rate",
        name: "Max Heart Rate",
        extractor: (record) => record.score?.max_heart_rate,
      },
      zero: {
        key: "zero",
        name: "Zone 0 Duration",
        extractor: (record) => record.score?.zone_durations?.zone_zero_milli,
        valuesTransform: (value) => value / 1000 / 60 / 60,
      },
      one: {
        key: "one",
        name: "Zone 1 Duration",
        extractor: (record) => record.score?.zone_durations?.zone_one_milli,
        valuesTransform: (value) => value / 1000 / 60 / 60,
      },
      two: {
        key: "two",
        name: "Zone 2 Duration",
        extractor: (record) => record.score?.zone_durations?.zone_two_milli,
        valuesTransform: (value) => value / 1000 / 60 / 60,
      },
      three: {
        key: "three",
        name: "Zone 3 Duration",
        extractor: (record) => record.score?.zone_durations?.zone_three_milli,
        valuesTransform: (value) => value / 1000 / 60 / 60,
        unit: " km",
      },
      four: {
        key: "four",
        name: "Zone 4 Duration",
        extractor: (record) => record.score?.zone_durations?.zone_four_milli,
        valuesTransform: (value) => value / 1000 / 60 / 60,
      },
      five: {
        key: "five",
        name: "Zone 5 Duration",
        extractor: (record) => record.score?.zone_durations?.zone_five_milli,
        valuesTransform: (value) => value / 1000 / 60 / 60,
      },
      sport_name: {
        key: "sport_name",
        name: "Sport Name",
        extractor: (record) => record.sport_name,
      },
    },
  },
};
