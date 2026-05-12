export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      access_requests: {
        Row: {
          assigned_reviewer: string | null
          biggest_challenge: string | null
          company_name: string
          company_size: string
          country: string
          created_at: string
          full_name: string
          heard_from: string | null
          hires_per_year: string
          id: string
          internal_notes: string | null
          preferred_times: string[] | null
          role: string
          roles_typically: string
          sector: string
          status: string
          updated_at: string
          work_email: string
        }
        Insert: {
          assigned_reviewer?: string | null
          biggest_challenge?: string | null
          company_name: string
          company_size: string
          country: string
          created_at?: string
          full_name: string
          heard_from?: string | null
          hires_per_year: string
          id?: string
          internal_notes?: string | null
          preferred_times?: string[] | null
          role: string
          roles_typically: string
          sector: string
          status?: string
          updated_at?: string
          work_email: string
        }
        Update: {
          assigned_reviewer?: string | null
          biggest_challenge?: string | null
          company_name?: string
          company_size?: string
          country?: string
          created_at?: string
          full_name?: string
          heard_from?: string | null
          hires_per_year?: string
          id?: string
          internal_notes?: string | null
          preferred_times?: string[] | null
          role?: string
          roles_typically?: string
          sector?: string
          status?: string
          updated_at?: string
          work_email?: string
        }
        Relationships: []
      }
      batches: {
        Row: {
          batch_number: number
          created_at: string
          id: string
          is_current: boolean
          job_id: string
          notes: string | null
        }
        Insert: {
          batch_number?: number
          created_at?: string
          id?: string
          is_current?: boolean
          job_id: string
          notes?: string | null
        }
        Update: {
          batch_number?: number
          created_at?: string
          id?: string
          is_current?: boolean
          job_id?: string
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "batches_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          country: string | null
          created_at: string
          departments: string[] | null
          description: string | null
          hires_per_year: string | null
          id: string
          industry: string | null
          locations: string[] | null
          logo_url: string | null
          name: string
          onboarding_complete: boolean | null
          owner_id: string
          role_focus: string[] | null
          size: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string
          departments?: string[] | null
          description?: string | null
          hires_per_year?: string | null
          id?: string
          industry?: string | null
          locations?: string[] | null
          logo_url?: string | null
          name: string
          onboarding_complete?: boolean | null
          owner_id: string
          role_focus?: string[] | null
          size?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string
          departments?: string[] | null
          description?: string | null
          hires_per_year?: string | null
          id?: string
          industry?: string | null
          locations?: string[] | null
          logo_url?: string | null
          name?: string
          onboarding_complete?: boolean | null
          owner_id?: string
          role_focus?: string[] | null
          size?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      consents: {
        Row: {
          consent_type: string
          granted: boolean
          granted_at: string
          id: string
          revoked_at: string | null
          user_id: string
        }
        Insert: {
          consent_type: string
          granted?: boolean
          granted_at?: string
          id?: string
          revoked_at?: string | null
          user_id: string
        }
        Update: {
          consent_type?: string
          granted?: boolean
          granted_at?: string
          id?: string
          revoked_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      education: {
        Row: {
          created_at: string
          degree: string | null
          end_year: number | null
          field: string | null
          id: string
          institution: string
          start_year: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          degree?: string | null
          end_year?: number | null
          field?: string | null
          id?: string
          institution: string
          start_year?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          degree?: string | null
          end_year?: number | null
          field?: string | null
          id?: string
          institution?: string
          start_year?: number | null
          user_id?: string
        }
        Relationships: []
      }
      experiences: {
        Row: {
          company: string
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          is_current: boolean | null
          role: string
          start_date: string | null
          user_id: string
        }
        Insert: {
          company: string
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          is_current?: boolean | null
          role: string
          start_date?: string | null
          user_id: string
        }
        Update: {
          company?: string
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          is_current?: boolean | null
          role?: string
          start_date?: string | null
          user_id?: string
        }
        Relationships: []
      }
      jobs: {
        Row: {
          batch_size: number | null
          company_id: string
          created_at: string
          created_by: string
          currency: string | null
          department: string | null
          description: string | null
          employment_type: string | null
          hard_filters: Json | null
          id: string
          location_city: string | null
          location_country: string | null
          nice_skills: string[] | null
          notice_period: string | null
          posted_at: string
          prioritize: Json | null
          required_education: string | null
          required_experience_years: number | null
          required_languages: Json | null
          required_skills: string[] | null
          salary_max: number | null
          salary_min: number | null
          seniority: string | null
          status: string
          title: string
          updated_at: string
          work_authorization: string | null
          work_modes: string[] | null
        }
        Insert: {
          batch_size?: number | null
          company_id: string
          created_at?: string
          created_by: string
          currency?: string | null
          department?: string | null
          description?: string | null
          employment_type?: string | null
          hard_filters?: Json | null
          id?: string
          location_city?: string | null
          location_country?: string | null
          nice_skills?: string[] | null
          notice_period?: string | null
          posted_at?: string
          prioritize?: Json | null
          required_education?: string | null
          required_experience_years?: number | null
          required_languages?: Json | null
          required_skills?: string[] | null
          salary_max?: number | null
          salary_min?: number | null
          seniority?: string | null
          status?: string
          title: string
          updated_at?: string
          work_authorization?: string | null
          work_modes?: string[] | null
        }
        Update: {
          batch_size?: number | null
          company_id?: string
          created_at?: string
          created_by?: string
          currency?: string | null
          department?: string | null
          description?: string | null
          employment_type?: string | null
          hard_filters?: Json | null
          id?: string
          location_city?: string | null
          location_country?: string | null
          nice_skills?: string[] | null
          notice_period?: string | null
          posted_at?: string
          prioritize?: Json | null
          required_education?: string | null
          required_experience_years?: number | null
          required_languages?: Json | null
          required_skills?: string[] | null
          salary_max?: number | null
          salary_min?: number | null
          seniority?: string | null
          status?: string
          title?: string
          updated_at?: string
          work_authorization?: string | null
          work_modes?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      languages: {
        Row: {
          created_at: string
          id: string
          name: string
          proficiency: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          proficiency: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          proficiency?: string
          user_id?: string
        }
        Relationships: []
      }
      matches: {
        Row: {
          company: string
          declined: boolean | null
          description: string | null
          id: string
          location: string
          match_score: number
          matched_at: string
          reasoning: string[] | null
          recruiter_email: string | null
          recruiter_message: string | null
          recruiter_name: string | null
          role: string
          saved: boolean | null
          score_experience: number | null
          score_language: number | null
          score_location: number | null
          score_skills: number | null
          status: string
          user_id: string
        }
        Insert: {
          company: string
          declined?: boolean | null
          description?: string | null
          id?: string
          location: string
          match_score: number
          matched_at?: string
          reasoning?: string[] | null
          recruiter_email?: string | null
          recruiter_message?: string | null
          recruiter_name?: string | null
          role: string
          saved?: boolean | null
          score_experience?: number | null
          score_language?: number | null
          score_location?: number | null
          score_skills?: number | null
          status?: string
          user_id: string
        }
        Update: {
          company?: string
          declined?: boolean | null
          description?: string | null
          id?: string
          location?: string
          match_score?: number
          matched_at?: string
          reasoning?: string[] | null
          recruiter_email?: string | null
          recruiter_message?: string | null
          recruiter_name?: string | null
          role?: string
          saved?: boolean | null
          score_experience?: number | null
          score_language?: number | null
          score_location?: number | null
          score_skills?: number | null
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          city: string | null
          country: string | null
          created_at: string
          current_title: string | null
          education_verified: boolean | null
          email: string | null
          email_verified: boolean | null
          experience_verified: boolean | null
          full_name: string | null
          id: string
          id_verified: boolean | null
          job_types: string[] | null
          notice_period: string | null
          onboarding_complete: boolean | null
          preferred_locations: string[] | null
          salary_max: number | null
          salary_min: number | null
          updated_at: string
          user_type: string
          work_authorization: string | null
          years_experience: number | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          created_at?: string
          current_title?: string | null
          education_verified?: boolean | null
          email?: string | null
          email_verified?: boolean | null
          experience_verified?: boolean | null
          full_name?: string | null
          id: string
          id_verified?: boolean | null
          job_types?: string[] | null
          notice_period?: string | null
          onboarding_complete?: boolean | null
          preferred_locations?: string[] | null
          salary_max?: number | null
          salary_min?: number | null
          updated_at?: string
          user_type?: string
          work_authorization?: string | null
          years_experience?: number | null
        }
        Update: {
          city?: string | null
          country?: string | null
          created_at?: string
          current_title?: string | null
          education_verified?: boolean | null
          email?: string | null
          email_verified?: boolean | null
          experience_verified?: boolean | null
          full_name?: string | null
          id?: string
          id_verified?: boolean | null
          job_types?: string[] | null
          notice_period?: string | null
          onboarding_complete?: boolean | null
          preferred_locations?: string[] | null
          salary_max?: number | null
          salary_min?: number | null
          updated_at?: string
          user_type?: string
          work_authorization?: string | null
          years_experience?: number | null
        }
        Relationships: []
      }
      recruiter_actions: {
        Row: {
          action_type: string
          company_id: string | null
          created_at: string
          id: string
          job_id: string | null
          match_id: string | null
          payload: Json | null
          user_id: string
        }
        Insert: {
          action_type: string
          company_id?: string | null
          created_at?: string
          id?: string
          job_id?: string | null
          match_id?: string | null
          payload?: Json | null
          user_id: string
        }
        Update: {
          action_type?: string
          company_id?: string | null
          created_at?: string
          id?: string
          job_id?: string | null
          match_id?: string | null
          payload?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      recruiter_matches: {
        Row: {
          batch_id: string
          candidate_anon_id: string
          candidate_current_company: string | null
          candidate_current_role: string | null
          candidate_education: string | null
          candidate_education_verified: boolean | null
          candidate_experience_verified: boolean | null
          candidate_first_name: string
          candidate_full_name: string | null
          candidate_id_verified: boolean | null
          candidate_languages: Json | null
          candidate_location: string | null
          candidate_profile_updated_at: string | null
          candidate_skills: string[] | null
          candidate_summary: string | null
          candidate_years_experience: number | null
          contact_body: string | null
          contact_subject: string | null
          contacted_at: string | null
          created_at: string
          decline_note: string | null
          decline_reason: string | null
          detailed_reasoning: Json | null
          id: string
          job_id: string
          match_score: number
          reasoning: Json | null
          saved: boolean | null
          score_experience: number | null
          score_language: number | null
          score_location: number | null
          score_skills: number | null
          status: string
        }
        Insert: {
          batch_id: string
          candidate_anon_id: string
          candidate_current_company?: string | null
          candidate_current_role?: string | null
          candidate_education?: string | null
          candidate_education_verified?: boolean | null
          candidate_experience_verified?: boolean | null
          candidate_first_name: string
          candidate_full_name?: string | null
          candidate_id_verified?: boolean | null
          candidate_languages?: Json | null
          candidate_location?: string | null
          candidate_profile_updated_at?: string | null
          candidate_skills?: string[] | null
          candidate_summary?: string | null
          candidate_years_experience?: number | null
          contact_body?: string | null
          contact_subject?: string | null
          contacted_at?: string | null
          created_at?: string
          decline_note?: string | null
          decline_reason?: string | null
          detailed_reasoning?: Json | null
          id?: string
          job_id: string
          match_score: number
          reasoning?: Json | null
          saved?: boolean | null
          score_experience?: number | null
          score_language?: number | null
          score_location?: number | null
          score_skills?: number | null
          status?: string
        }
        Update: {
          batch_id?: string
          candidate_anon_id?: string
          candidate_current_company?: string | null
          candidate_current_role?: string | null
          candidate_education?: string | null
          candidate_education_verified?: boolean | null
          candidate_experience_verified?: boolean | null
          candidate_first_name?: string
          candidate_full_name?: string | null
          candidate_id_verified?: boolean | null
          candidate_languages?: Json | null
          candidate_location?: string | null
          candidate_profile_updated_at?: string | null
          candidate_skills?: string[] | null
          candidate_summary?: string | null
          candidate_years_experience?: number | null
          contact_body?: string | null
          contact_subject?: string | null
          contacted_at?: string | null
          created_at?: string
          decline_note?: string | null
          decline_reason?: string | null
          detailed_reasoning?: Json | null
          id?: string
          job_id?: string
          match_score?: number
          reasoning?: Json | null
          saved?: boolean | null
          score_experience?: number | null
          score_language?: number | null
          score_location?: number | null
          score_skills?: number | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "recruiter_matches_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recruiter_matches_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      skills: {
        Row: {
          created_at: string
          id: string
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          company_id: string
          created_at: string
          email: string
          id: string
          invited_by: string | null
          role: string
          status: string
          user_id: string | null
        }
        Insert: {
          company_id: string
          created_at?: string
          email: string
          id?: string
          invited_by?: string | null
          role?: string
          status?: string
          user_id?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string
          email?: string
          id?: string
          invited_by?: string | null
          role?: string
          status?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_members_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_company_admin: {
        Args: { _company_id: string; _user_id: string }
        Returns: boolean
      }
      is_company_member: {
        Args: { _company_id: string; _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
