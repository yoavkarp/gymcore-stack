import mongoose from "mongoose";
import { z } from "zod";
export declare const rangedSchema: z.ZodEffects<z.ZodObject<{
    min: z.ZodOptional<z.ZodNumber>;
    max: z.ZodOptional<z.ZodNumber>;
    u: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    min?: number | undefined;
    max?: number | undefined;
    u?: string | undefined;
}, {
    min?: number | undefined;
    max?: number | undefined;
    u?: string | undefined;
}>, {
    min?: number | undefined;
    max?: number | undefined;
    u?: string | undefined;
}, {
    min?: number | undefined;
    max?: number | undefined;
    u?: string | undefined;
}>;
export declare const cardioDataSchema: z.ZodObject<{
    angle: z.ZodOptional<z.ZodEffects<z.ZodObject<{
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
        u: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }>, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }>>;
    dis: z.ZodOptional<z.ZodEffects<z.ZodObject<{
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
        u: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }>, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }>>;
    intens: z.ZodOptional<z.ZodEffects<z.ZodObject<{
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
        u: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }>, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }>>;
    resist: z.ZodOptional<z.ZodEffects<z.ZodObject<{
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
        u: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }>, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }>>;
    rest: z.ZodOptional<z.ZodEffects<z.ZodObject<{
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
        u: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }>, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }>>;
    tempo: z.ZodOptional<z.ZodEffects<z.ZodObject<{
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
        u: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }>, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }>>;
    thr: z.ZodOptional<z.ZodEffects<z.ZodObject<{
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
        u: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }>, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }>>;
    time: z.ZodOptional<z.ZodEffects<z.ZodObject<{
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
        u: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }>, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }>>;
    weight: z.ZodOptional<z.ZodEffects<z.ZodObject<{
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
        u: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }>, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    weight?: {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    } | undefined;
    angle?: {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    } | undefined;
    dis?: {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    } | undefined;
    intens?: {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    } | undefined;
    resist?: {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    } | undefined;
    rest?: {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    } | undefined;
    tempo?: {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    } | undefined;
    thr?: {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    } | undefined;
    time?: {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    } | undefined;
}, {
    weight?: {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    } | undefined;
    angle?: {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    } | undefined;
    dis?: {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    } | undefined;
    intens?: {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    } | undefined;
    resist?: {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    } | undefined;
    rest?: {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    } | undefined;
    tempo?: {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    } | undefined;
    thr?: {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    } | undefined;
    time?: {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    } | undefined;
}>;
export declare const strengthDataSchema: z.ZodObject<{
    dropsets: z.ZodDefault<z.ZodArray<z.ZodObject<{
        reps: z.ZodOptional<z.ZodEffects<z.ZodObject<{
            min: z.ZodOptional<z.ZodNumber>;
            max: z.ZodOptional<z.ZodNumber>;
            u: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }>, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }>>;
        weight: z.ZodOptional<z.ZodEffects<z.ZodObject<{
            min: z.ZodOptional<z.ZodNumber>;
            max: z.ZodOptional<z.ZodNumber>;
            u: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }>, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        weight?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        reps?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
    }, {
        weight?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        reps?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
    }>, "many">>;
    reps: z.ZodOptional<z.ZodEffects<z.ZodObject<{
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
        u: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }>, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }>>;
    rest: z.ZodOptional<z.ZodEffects<z.ZodObject<{
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
        u: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }>, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }>>;
    time: z.ZodOptional<z.ZodEffects<z.ZodObject<{
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
        u: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }>, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }>>;
    weight: z.ZodOptional<z.ZodEffects<z.ZodObject<{
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
        u: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }>, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }, {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    dropsets: {
        weight?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        reps?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
    }[];
    weight?: {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    } | undefined;
    rest?: {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    } | undefined;
    time?: {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    } | undefined;
    reps?: {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    } | undefined;
}, {
    weight?: {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    } | undefined;
    rest?: {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    } | undefined;
    time?: {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    } | undefined;
    reps?: {
        min?: number | undefined;
        max?: number | undefined;
        u?: string | undefined;
    } | undefined;
    dropsets?: {
        weight?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        reps?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
    }[] | undefined;
}>;
export declare const workoutExerciseSchema: z.ZodObject<{
    data: z.ZodDefault<z.ZodUnion<[z.ZodArray<z.ZodObject<{
        angle: z.ZodOptional<z.ZodEffects<z.ZodObject<{
            min: z.ZodOptional<z.ZodNumber>;
            max: z.ZodOptional<z.ZodNumber>;
            u: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }>, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }>>;
        dis: z.ZodOptional<z.ZodEffects<z.ZodObject<{
            min: z.ZodOptional<z.ZodNumber>;
            max: z.ZodOptional<z.ZodNumber>;
            u: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }>, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }>>;
        intens: z.ZodOptional<z.ZodEffects<z.ZodObject<{
            min: z.ZodOptional<z.ZodNumber>;
            max: z.ZodOptional<z.ZodNumber>;
            u: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }>, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }>>;
        resist: z.ZodOptional<z.ZodEffects<z.ZodObject<{
            min: z.ZodOptional<z.ZodNumber>;
            max: z.ZodOptional<z.ZodNumber>;
            u: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }>, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }>>;
        rest: z.ZodOptional<z.ZodEffects<z.ZodObject<{
            min: z.ZodOptional<z.ZodNumber>;
            max: z.ZodOptional<z.ZodNumber>;
            u: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }>, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }>>;
        tempo: z.ZodOptional<z.ZodEffects<z.ZodObject<{
            min: z.ZodOptional<z.ZodNumber>;
            max: z.ZodOptional<z.ZodNumber>;
            u: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }>, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }>>;
        thr: z.ZodOptional<z.ZodEffects<z.ZodObject<{
            min: z.ZodOptional<z.ZodNumber>;
            max: z.ZodOptional<z.ZodNumber>;
            u: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }>, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }>>;
        time: z.ZodOptional<z.ZodEffects<z.ZodObject<{
            min: z.ZodOptional<z.ZodNumber>;
            max: z.ZodOptional<z.ZodNumber>;
            u: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }>, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }>>;
        weight: z.ZodOptional<z.ZodEffects<z.ZodObject<{
            min: z.ZodOptional<z.ZodNumber>;
            max: z.ZodOptional<z.ZodNumber>;
            u: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }>, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        weight?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        angle?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        dis?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        intens?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        resist?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        rest?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        tempo?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        thr?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        time?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
    }, {
        weight?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        angle?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        dis?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        intens?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        resist?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        rest?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        tempo?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        thr?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        time?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
    }>, "many">, z.ZodArray<z.ZodObject<{
        dropsets: z.ZodDefault<z.ZodArray<z.ZodObject<{
            reps: z.ZodOptional<z.ZodEffects<z.ZodObject<{
                min: z.ZodOptional<z.ZodNumber>;
                max: z.ZodOptional<z.ZodNumber>;
                u: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }>, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }>>;
            weight: z.ZodOptional<z.ZodEffects<z.ZodObject<{
                min: z.ZodOptional<z.ZodNumber>;
                max: z.ZodOptional<z.ZodNumber>;
                u: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }>, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            weight?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            reps?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
        }, {
            weight?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            reps?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
        }>, "many">>;
        reps: z.ZodOptional<z.ZodEffects<z.ZodObject<{
            min: z.ZodOptional<z.ZodNumber>;
            max: z.ZodOptional<z.ZodNumber>;
            u: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }>, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }>>;
        rest: z.ZodOptional<z.ZodEffects<z.ZodObject<{
            min: z.ZodOptional<z.ZodNumber>;
            max: z.ZodOptional<z.ZodNumber>;
            u: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }>, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }>>;
        time: z.ZodOptional<z.ZodEffects<z.ZodObject<{
            min: z.ZodOptional<z.ZodNumber>;
            max: z.ZodOptional<z.ZodNumber>;
            u: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }>, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }>>;
        weight: z.ZodOptional<z.ZodEffects<z.ZodObject<{
            min: z.ZodOptional<z.ZodNumber>;
            max: z.ZodOptional<z.ZodNumber>;
            u: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }>, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }, {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        dropsets: {
            weight?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            reps?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
        }[];
        weight?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        rest?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        time?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        reps?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
    }, {
        weight?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        rest?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        time?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        reps?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        dropsets?: {
            weight?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            reps?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
        }[] | undefined;
    }>, "many">]>>;
    notes: z.ZodOptional<z.ZodString>;
    exerciseId: z.ZodType<mongoose.Types.ObjectId, z.ZodTypeDef, mongoose.Types.ObjectId>;
    mn: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    sh: z.ZodOptional<z.ZodString>;
    type: z.ZodEnum<["cardio", "strength", "warmup", "cooldown"]>;
}, "strip", z.ZodTypeAny, {
    type: "cardio" | "strength" | "warmup" | "cooldown";
    data: {
        weight?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        angle?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        dis?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        intens?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        resist?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        rest?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        tempo?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        thr?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        time?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
    }[] | {
        dropsets: {
            weight?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            reps?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
        }[];
        weight?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        rest?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        time?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        reps?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
    }[];
    exerciseId: mongoose.Types.ObjectId;
    name?: string | undefined;
    notes?: string | undefined;
    mn?: string | undefined;
    sh?: string | undefined;
}, {
    type: "cardio" | "strength" | "warmup" | "cooldown";
    exerciseId: mongoose.Types.ObjectId;
    name?: string | undefined;
    data?: {
        weight?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        angle?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        dis?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        intens?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        resist?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        rest?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        tempo?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        thr?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        time?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
    }[] | {
        weight?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        rest?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        time?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        reps?: {
            min?: number | undefined;
            max?: number | undefined;
            u?: string | undefined;
        } | undefined;
        dropsets?: {
            weight?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            reps?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
        }[] | undefined;
    }[] | undefined;
    notes?: string | undefined;
    mn?: string | undefined;
    sh?: string | undefined;
}>;
export declare const workoutSchema: z.ZodObject<z.objectUtil.extendShape<{
    clubId: z.ZodType<mongoose.Types.ObjectId, z.ZodTypeDef, mongoose.Types.ObjectId>;
    notes: z.ZodOptional<z.ZodString>;
    level: z.ZodDefault<z.ZodEnum<["beginner", "intermediate", "advanced"]>>;
    member_uid: z.ZodType<mongoose.Types.ObjectId, z.ZodTypeDef, mongoose.Types.ObjectId>;
    name: z.ZodOptional<z.ZodString>;
    trainer_uid: z.ZodOptional<z.ZodType<mongoose.Types.ObjectId, z.ZodTypeDef, mongoose.Types.ObjectId>>;
    exercises: z.ZodDefault<z.ZodArray<z.ZodObject<{
        data: z.ZodDefault<z.ZodUnion<[z.ZodArray<z.ZodObject<{
            angle: z.ZodOptional<z.ZodEffects<z.ZodObject<{
                min: z.ZodOptional<z.ZodNumber>;
                max: z.ZodOptional<z.ZodNumber>;
                u: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }>, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }>>;
            dis: z.ZodOptional<z.ZodEffects<z.ZodObject<{
                min: z.ZodOptional<z.ZodNumber>;
                max: z.ZodOptional<z.ZodNumber>;
                u: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }>, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }>>;
            intens: z.ZodOptional<z.ZodEffects<z.ZodObject<{
                min: z.ZodOptional<z.ZodNumber>;
                max: z.ZodOptional<z.ZodNumber>;
                u: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }>, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }>>;
            resist: z.ZodOptional<z.ZodEffects<z.ZodObject<{
                min: z.ZodOptional<z.ZodNumber>;
                max: z.ZodOptional<z.ZodNumber>;
                u: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }>, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }>>;
            rest: z.ZodOptional<z.ZodEffects<z.ZodObject<{
                min: z.ZodOptional<z.ZodNumber>;
                max: z.ZodOptional<z.ZodNumber>;
                u: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }>, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }>>;
            tempo: z.ZodOptional<z.ZodEffects<z.ZodObject<{
                min: z.ZodOptional<z.ZodNumber>;
                max: z.ZodOptional<z.ZodNumber>;
                u: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }>, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }>>;
            thr: z.ZodOptional<z.ZodEffects<z.ZodObject<{
                min: z.ZodOptional<z.ZodNumber>;
                max: z.ZodOptional<z.ZodNumber>;
                u: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }>, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }>>;
            time: z.ZodOptional<z.ZodEffects<z.ZodObject<{
                min: z.ZodOptional<z.ZodNumber>;
                max: z.ZodOptional<z.ZodNumber>;
                u: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }>, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }>>;
            weight: z.ZodOptional<z.ZodEffects<z.ZodObject<{
                min: z.ZodOptional<z.ZodNumber>;
                max: z.ZodOptional<z.ZodNumber>;
                u: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }>, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            weight?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            angle?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            dis?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            intens?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            resist?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            rest?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            tempo?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            thr?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            time?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
        }, {
            weight?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            angle?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            dis?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            intens?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            resist?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            rest?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            tempo?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            thr?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            time?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
        }>, "many">, z.ZodArray<z.ZodObject<{
            dropsets: z.ZodDefault<z.ZodArray<z.ZodObject<{
                reps: z.ZodOptional<z.ZodEffects<z.ZodObject<{
                    min: z.ZodOptional<z.ZodNumber>;
                    max: z.ZodOptional<z.ZodNumber>;
                    u: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    min?: number | undefined;
                    max?: number | undefined;
                    u?: string | undefined;
                }, {
                    min?: number | undefined;
                    max?: number | undefined;
                    u?: string | undefined;
                }>, {
                    min?: number | undefined;
                    max?: number | undefined;
                    u?: string | undefined;
                }, {
                    min?: number | undefined;
                    max?: number | undefined;
                    u?: string | undefined;
                }>>;
                weight: z.ZodOptional<z.ZodEffects<z.ZodObject<{
                    min: z.ZodOptional<z.ZodNumber>;
                    max: z.ZodOptional<z.ZodNumber>;
                    u: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    min?: number | undefined;
                    max?: number | undefined;
                    u?: string | undefined;
                }, {
                    min?: number | undefined;
                    max?: number | undefined;
                    u?: string | undefined;
                }>, {
                    min?: number | undefined;
                    max?: number | undefined;
                    u?: string | undefined;
                }, {
                    min?: number | undefined;
                    max?: number | undefined;
                    u?: string | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                weight?: {
                    min?: number | undefined;
                    max?: number | undefined;
                    u?: string | undefined;
                } | undefined;
                reps?: {
                    min?: number | undefined;
                    max?: number | undefined;
                    u?: string | undefined;
                } | undefined;
            }, {
                weight?: {
                    min?: number | undefined;
                    max?: number | undefined;
                    u?: string | undefined;
                } | undefined;
                reps?: {
                    min?: number | undefined;
                    max?: number | undefined;
                    u?: string | undefined;
                } | undefined;
            }>, "many">>;
            reps: z.ZodOptional<z.ZodEffects<z.ZodObject<{
                min: z.ZodOptional<z.ZodNumber>;
                max: z.ZodOptional<z.ZodNumber>;
                u: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }>, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }>>;
            rest: z.ZodOptional<z.ZodEffects<z.ZodObject<{
                min: z.ZodOptional<z.ZodNumber>;
                max: z.ZodOptional<z.ZodNumber>;
                u: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }>, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }>>;
            time: z.ZodOptional<z.ZodEffects<z.ZodObject<{
                min: z.ZodOptional<z.ZodNumber>;
                max: z.ZodOptional<z.ZodNumber>;
                u: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }>, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }>>;
            weight: z.ZodOptional<z.ZodEffects<z.ZodObject<{
                min: z.ZodOptional<z.ZodNumber>;
                max: z.ZodOptional<z.ZodNumber>;
                u: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }>, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }, {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            dropsets: {
                weight?: {
                    min?: number | undefined;
                    max?: number | undefined;
                    u?: string | undefined;
                } | undefined;
                reps?: {
                    min?: number | undefined;
                    max?: number | undefined;
                    u?: string | undefined;
                } | undefined;
            }[];
            weight?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            rest?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            time?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            reps?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
        }, {
            weight?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            rest?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            time?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            reps?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            dropsets?: {
                weight?: {
                    min?: number | undefined;
                    max?: number | undefined;
                    u?: string | undefined;
                } | undefined;
                reps?: {
                    min?: number | undefined;
                    max?: number | undefined;
                    u?: string | undefined;
                } | undefined;
            }[] | undefined;
        }>, "many">]>>;
        notes: z.ZodOptional<z.ZodString>;
        exerciseId: z.ZodType<mongoose.Types.ObjectId, z.ZodTypeDef, mongoose.Types.ObjectId>;
        mn: z.ZodOptional<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
        sh: z.ZodOptional<z.ZodString>;
        type: z.ZodEnum<["cardio", "strength", "warmup", "cooldown"]>;
    }, "strip", z.ZodTypeAny, {
        type: "cardio" | "strength" | "warmup" | "cooldown";
        data: {
            weight?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            angle?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            dis?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            intens?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            resist?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            rest?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            tempo?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            thr?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            time?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
        }[] | {
            dropsets: {
                weight?: {
                    min?: number | undefined;
                    max?: number | undefined;
                    u?: string | undefined;
                } | undefined;
                reps?: {
                    min?: number | undefined;
                    max?: number | undefined;
                    u?: string | undefined;
                } | undefined;
            }[];
            weight?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            rest?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            time?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            reps?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
        }[];
        exerciseId: mongoose.Types.ObjectId;
        name?: string | undefined;
        notes?: string | undefined;
        mn?: string | undefined;
        sh?: string | undefined;
    }, {
        type: "cardio" | "strength" | "warmup" | "cooldown";
        exerciseId: mongoose.Types.ObjectId;
        name?: string | undefined;
        data?: {
            weight?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            angle?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            dis?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            intens?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            resist?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            rest?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            tempo?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            thr?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            time?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
        }[] | {
            weight?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            rest?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            time?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            reps?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            dropsets?: {
                weight?: {
                    min?: number | undefined;
                    max?: number | undefined;
                    u?: string | undefined;
                } | undefined;
                reps?: {
                    min?: number | undefined;
                    max?: number | undefined;
                    u?: string | undefined;
                } | undefined;
            }[] | undefined;
        }[] | undefined;
        notes?: string | undefined;
        mn?: string | undefined;
        sh?: string | undefined;
    }>, "many">>;
}, {
    created_at: z.ZodDefault<z.ZodNumber>;
    updated_at: z.ZodDefault<z.ZodNumber>;
    created_by: z.ZodType<mongoose.Types.ObjectId, z.ZodTypeDef, mongoose.Types.ObjectId>;
    updated_by: z.ZodType<mongoose.Types.ObjectId, z.ZodTypeDef, mongoose.Types.ObjectId>;
}>, "strip", z.ZodTypeAny, {
    created_at: number;
    updated_at: number;
    created_by: mongoose.Types.ObjectId;
    updated_by: mongoose.Types.ObjectId;
    clubId: mongoose.Types.ObjectId;
    level: "beginner" | "intermediate" | "advanced";
    member_uid: mongoose.Types.ObjectId;
    exercises: {
        type: "cardio" | "strength" | "warmup" | "cooldown";
        data: {
            weight?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            angle?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            dis?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            intens?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            resist?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            rest?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            tempo?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            thr?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            time?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
        }[] | {
            dropsets: {
                weight?: {
                    min?: number | undefined;
                    max?: number | undefined;
                    u?: string | undefined;
                } | undefined;
                reps?: {
                    min?: number | undefined;
                    max?: number | undefined;
                    u?: string | undefined;
                } | undefined;
            }[];
            weight?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            rest?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            time?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            reps?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
        }[];
        exerciseId: mongoose.Types.ObjectId;
        name?: string | undefined;
        notes?: string | undefined;
        mn?: string | undefined;
        sh?: string | undefined;
    }[];
    name?: string | undefined;
    notes?: string | undefined;
    trainer_uid?: mongoose.Types.ObjectId | undefined;
}, {
    created_by: mongoose.Types.ObjectId;
    updated_by: mongoose.Types.ObjectId;
    clubId: mongoose.Types.ObjectId;
    member_uid: mongoose.Types.ObjectId;
    name?: string | undefined;
    created_at?: number | undefined;
    updated_at?: number | undefined;
    notes?: string | undefined;
    level?: "beginner" | "intermediate" | "advanced" | undefined;
    trainer_uid?: mongoose.Types.ObjectId | undefined;
    exercises?: {
        type: "cardio" | "strength" | "warmup" | "cooldown";
        exerciseId: mongoose.Types.ObjectId;
        name?: string | undefined;
        data?: {
            weight?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            angle?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            dis?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            intens?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            resist?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            rest?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            tempo?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            thr?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            time?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
        }[] | {
            weight?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            rest?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            time?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            reps?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            dropsets?: {
                weight?: {
                    min?: number | undefined;
                    max?: number | undefined;
                    u?: string | undefined;
                } | undefined;
                reps?: {
                    min?: number | undefined;
                    max?: number | undefined;
                    u?: string | undefined;
                } | undefined;
            }[] | undefined;
        }[] | undefined;
        notes?: string | undefined;
        mn?: string | undefined;
        sh?: string | undefined;
    }[] | undefined;
}>;
export type IWorkout = z.infer<typeof workoutSchema>;
export type ICardioExerciseData = z.infer<typeof cardioDataSchema>;
export type IStrengthExerciseData = z.infer<typeof strengthDataSchema>;
export type IWorkoutExercise = z.infer<typeof workoutExerciseSchema>;
export type WorkoutDocument = mongoose.HydratedDocument<IWorkout>;
export declare const getWorkoutModel: import("../types/mongoose-model").GetModel<{
    created_at: number;
    updated_at: number;
    created_by: mongoose.Types.ObjectId;
    updated_by: mongoose.Types.ObjectId;
    clubId: mongoose.Types.ObjectId;
    level: "beginner" | "intermediate" | "advanced";
    member_uid: mongoose.Types.ObjectId;
    exercises: {
        type: "cardio" | "strength" | "warmup" | "cooldown";
        data: {
            weight?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            angle?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            dis?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            intens?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            resist?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            rest?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            tempo?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            thr?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            time?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
        }[] | {
            dropsets: {
                weight?: {
                    min?: number | undefined;
                    max?: number | undefined;
                    u?: string | undefined;
                } | undefined;
                reps?: {
                    min?: number | undefined;
                    max?: number | undefined;
                    u?: string | undefined;
                } | undefined;
            }[];
            weight?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            rest?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            time?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
            reps?: {
                min?: number | undefined;
                max?: number | undefined;
                u?: string | undefined;
            } | undefined;
        }[];
        exerciseId: mongoose.Types.ObjectId;
        name?: string | undefined;
        notes?: string | undefined;
        mn?: string | undefined;
        sh?: string | undefined;
    }[];
    name?: string | undefined;
    notes?: string | undefined;
    trainer_uid?: mongoose.Types.ObjectId | undefined;
}>;
