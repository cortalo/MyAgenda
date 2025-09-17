package com.nowcoder.community.dao;

import com.nowcoder.community.entity.AgendaEntry;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AgendaEntryMapper {

    int insertAgendaEntry(AgendaEntry agendaEntry);

    List<AgendaEntry> selectAgendaEntries(int userId);

}
