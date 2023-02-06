package com.ssafy.matching.repository;

import com.ssafy.matching.dto.Team;
import com.ssafy.matching.dto.TeamMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamMemberRepository extends JpaRepository<TeamMember, Integer> {
    TeamMember save(TeamMember teamMember);
    void deleteByTeamAndMemberId(Team team, long memberId);
}
